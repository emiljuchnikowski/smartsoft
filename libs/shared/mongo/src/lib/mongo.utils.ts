import {MongoConfig} from "@smartsoft001/mongo";

export function getMongoUrl(config: MongoConfig): string {
    let url;
    if (config.username && config.password)
        url = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}`;
    else url = `mongodb://${config.host}:${config.port}`;

    return url + "?authSource=" + config.database;
}
