import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamConfig} from "../../stream.config";
import {SocketService} from "../../services/socket/socket.service";
import {tap} from "rxjs/operators";

@Injectable()
export class StreamProvider {
    comments: Array<IStreamComment> = [];

    constructor(
        private http: HttpClient,
        private config: StreamConfig,
        private socketService: SocketService
    ) { }

    init(id: string, mode: 'client' | 'sender'): void {
        this.socketService.emit('register', {
            mode, streamId: id
        })
    }

    addComment(id: string, item: IStreamComment): Promise<void> {
        return this.http.post<void>(this.config.apiUrl + '/' + id + '/comments', item).toPromise();
    }

    getById(id: string): Observable<IStream> {
        this.socketService.on(id + '/comments/create', res => {
           this.comments = [
               res,
               ...this.comments
           ]
        });

        return this.http.get<IStream>(this.config.apiUrl + '/' + id).pipe(
            tap(item => {
                this.comments = item.comments;
            })
        );
    }
}
