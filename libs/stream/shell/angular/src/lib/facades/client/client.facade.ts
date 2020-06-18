import {Injectable} from "@angular/core";
import {Debounce} from "lodash-decorators";

import {SocketService} from "../../services/socket/socket.service";

@Injectable()
export class StreamClientFacade {
    constructor(private socketService: SocketService) {
    }

    watch(streamId): void {
        this.socketService.emit('watcher_begin', {
            streamId: streamId
        });
        console.log('3. watcher begin');
    }

    logGetOffer(description): void {
        console.log('4. offer get', description);
    }

    sendAnswer(data): void {
        this.socketService.emit("answer_create", data);
        console.log('5. answer send', data);
    }

    @Debounce(500)
    sendCandidate(data): void {
        this.socketService.emit("candidate_create", data);
        console.log('6. candidate send', data);
    }

    logCandidateError(streamId, error): void {
        console.error('*. candidate (error)', streamId, error);
        this.watch(streamId);
    }

    @Debounce(2000)
    logGetTrack(): void {
        console.log('*. track get', new Date());
    }
}
