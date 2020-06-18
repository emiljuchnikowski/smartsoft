import {Injectable} from "@angular/core";
import {Debounce} from "lodash-decorators";

import {SocketService} from "../../services/socket/socket.service";

@Injectable()
export class StreamSenderFacade {
    constructor(private socketService: SocketService) {
    }

    logWatch(data): void {
        console.log('3. watch', data);
    }

    createOffer(data): void {
        this.socketService.emit("offer_create", data);
        console.log('4. offer create', data);
    }

    logAnswerGet(data): void {
        console.log('5. answer get', data);
    }

    logAnswerGetError(data, error): void {
        console.error('5. answer get (error)', data, error);
    }

    logCandidateGet(data): void {
        console.log('6. candidate get', data);
    }

    logCandidateGetError(data, error): void {
        console.error('6. candidate get (error)', data, error);
    }

    @Debounce(2000)
    logSendTrack(): void {
        console.log('*. track send', new Date());
    }
}
