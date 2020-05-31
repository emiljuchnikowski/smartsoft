import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamConfig} from "../../stream.config";
import {SocketService} from "../../services/socket/socket.service";
import {tap} from "rxjs/operators";

@Injectable()
export class StreamProvider {
    private _peerConnectionConfig = {
        'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]
    };
    private _clientStreamSource = new Subject<MediaStream>();

    peerConnections: {
        [key: string]: RTCPeerConnection
    } = {};
    comments: Array<IStreamComment> = [];

    clientStream$ = this._clientStreamSource.asObservable();

    constructor(
        private http: HttpClient,
        private config: StreamConfig,
        private socketService: SocketService
    ) { }

    async addStream(streamId: string, stream: MediaStream): Promise<void> {
        this.socketService.on(streamId + '_watcher', id => {
            const peerConnection = new RTCPeerConnection(this._peerConnectionConfig);
            this.peerConnections[id] = peerConnection;

            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.socketService.emit(streamId + "_candidate", {
                        id,
                        candidate: event.candidate
                    });
                }
            };

            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    this.socketService.emit("offer_create", {
                        clientId: id,
                        streamId: streamId,
                        offer: peerConnection.localDescription
                    });
                });
        });

        this.socketService.on(streamId + '_answer', ({ clientId, answer }) => {
            this.peerConnections[clientId].setRemoteDescription(answer);
        });

        this.socketService.on(streamId + '_candidate', ({ clientId, candidate }) => {
            this.peerConnections[clientId].addIceCandidate(new RTCIceCandidate(candidate));
        });
    }

    init(streamId: string, mode: 'client' | 'sender'): void {
        this.socketService.emit('register', {
            mode, streamId: streamId
        }, async done => {
            if (mode === "client") {
                this.registerClient(streamId);
            }
        });

        if (mode === "client") {
            this.socketService.on(streamId + "_sender", _ => {
                this.registerClient(streamId);
            });
        }
    }

    private registerClient(streamId: string) {
        this.socketService.emit('watcher_begin');

        this.socketService.on(streamId + "_offer", description => {
            const peerConnection = new RTCPeerConnection(this._peerConnectionConfig);

            peerConnection
                .setRemoteDescription(description)
                .then(() => peerConnection.createAnswer())
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    this.socketService.emit("answer_create", {
                        answer: peerConnection.localDescription,
                        streamId: streamId
                    });
                });

            peerConnection.ontrack = event => {
                this._clientStreamSource.next(event.streams[0]);
            };
            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.socketService.emit("candidate_create", {
                        streamId: streamId,
                        candidate: event.candidate
                    });
                }
            };

            this.socketService.on(streamId + "_disconnect", () => {
               this._clientStreamSource.next(null);
               peerConnection.close();
            });
        });
    }

    destroy(id: string, mode: 'client' | 'sender'): void {
        this.socketService.emit('unregister', {
            mode, streamId: id
        });
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
