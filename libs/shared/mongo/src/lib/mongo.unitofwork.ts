import {ClientSession, MongoClient, TransactionOptions} from "mongodb";

import {ITransaction, IUnitOfWork} from "@smartsoft001/domain-core";
import {MongoConfig} from "@smartsoft001/mongo";
import {getMongoUrl} from "./mongo.utils";

export interface IMongoTransaction extends ITransaction {
    session: ClientSession
}

export class MongoUnitOfWork extends IUnitOfWork {
    constructor(private config: MongoConfig) {
        super();
    }

    scope(definition: (transaction: ITransaction) => Promise<void>): Promise<void> {
        return new Promise<void>((res, rej) => {
            MongoClient.connect(this.getUrl(), async (err, client) => {
                if (err) {
                    rej(err);
                    return;
                }

                // Step 1: Start a Client Session
                const session = client.startSession();

                // Step 2: Optional. Define options to use for the transaction
                const transactionOptions: TransactionOptions = {
                    readPreference: 'primary',
                    readConcern: { level: 'local' },
                    writeConcern: { w: 'majority' }
                };

                // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
                // Note: The callback for withTransaction MUST be async and/or return a Promise.
                try {
                    await session.withTransaction(async () => {
                        await definition({
                            session,
                            connection: client
                        } as IMongoTransaction);
                    }, transactionOptions);
                } finally {
                    await session.endSession();
                    await client.close();
                }
            });
        });
    }

    private getUrl(): string {
        return getMongoUrl(this.config);
    }
}
