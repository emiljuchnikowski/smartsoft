import {Socket} from "ngx-socket-io";
import {Injectable} from "@angular/core";

import {StreamConfig} from "../../stream.config";

@Injectable()
export class SocketService extends Socket {
    constructor(private streamConfig: StreamConfig) {
        super({
            url: streamConfig.apiUrl,
            options: {
                transports: ["websocket"],
                path: new URL(streamConfig.apiUrl).pathname + '/_socket/'
            }
        });
    }
}
