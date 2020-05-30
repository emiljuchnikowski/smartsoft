import {Injectable} from "@angular/core";

import {StreamProvider} from "./providers/stream/stream.provider";

@Injectable()
export class StreamConfig {
    provider?: StreamProvider;
    apiUrl: string;
}
