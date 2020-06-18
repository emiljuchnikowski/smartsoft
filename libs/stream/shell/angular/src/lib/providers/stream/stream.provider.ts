import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

import {IStream, IStreamComment} from "@smartsoft001/stream-shell-dtos";

import {StreamConfig} from "../../stream.config";
import {SocketService} from "../../services/socket/socket.service";
import {StreamClientFacade, StreamSenderFacade} from "../../facades";

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
        private socketService: SocketService,
        private clientFacade: StreamClientFacade,
        private senderFacade: StreamSenderFacade
    ) { }

    async addStream(streamId: string, stream: MediaStream): Promise<void> {
        this.socketService.on(streamId + '_watcher', id => {
            const peerConnection = new RTCPeerConnection(this._peerConnectionConfig);
            this.peerConnections[id] = peerConnection;

            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
                this.senderFacade.logSendTrack();
            });

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.socketService.emit(streamId + "_candidate", {
                        id,
                        candidate: event.candidate
                    });
                }
            };

            this.senderFacade.logWatch({
                streamId,
                clientId: id
            })

            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    const data = {
                        clientId: id,
                        streamId: streamId,
                        offer: peerConnection.localDescription
                    };

                    this.senderFacade.createOffer(data);
                });
        });

        this.socketService.on(streamId + '_answer', ({ clientId, answer }) => {
            this.peerConnections[clientId].setRemoteDescription(answer)
                .then(() => {
                    this.senderFacade.logAnswerGet(answer);
                })
                .catch(error => {
                    this.senderFacade.logAnswerGetError(answer, error);
                });
        });

        this.socketService.on(streamId + '_candidate', ({ clientId, candidate }) => {
            this.peerConnections[clientId].addIceCandidate(new RTCIceCandidate(candidate))
                .then(() => {
                    this.senderFacade.logCandidateGet({ clientId, candidate });
                })
                .catch(error => {
                    this.senderFacade.logCandidateGetError({ clientId, candidate }, error)
                });
        });
    }

    init(streamId: string, mode: 'client' | 'sender'): void {
        const data = {
            mode, streamId: streamId
        };

        this.socketService.emit('register', data, async done => {
            console.log('2. register done', done);

            if (mode === "client") {
                this.registerClient(streamId);
            }
        });
        console.log('1. register', data);

        // this.socketService.on(streamId + '_watcher', () => {
        //     if (mode === "client") {
        //         this.registerClient(streamId);
        //     }
        // });

        if (mode === "client") {
            this.socketService.on(streamId + "_sender", _ => {
                this.registerClient(streamId);
            });
        }
    }

    private registerClient(streamId: string) {
        this.clientFacade.watch(streamId);

        this.socketService.on(streamId + "_offer", description => {
            const peerConnection = new RTCPeerConnection(this._peerConnectionConfig);

            this.clientFacade.logGetOffer(description);

            peerConnection
                .setRemoteDescription(description)
                .then(() => peerConnection.createAnswer())
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    this.clientFacade.sendAnswer({
                        answer: peerConnection.localDescription,
                        streamId: streamId
                    });
                });

            peerConnection.ontrack = event => {
                this._clientStreamSource.next(event.streams[0]);
                this.clientFacade.logGetTrack();
            };
            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    const data = {
                        streamId: streamId,
                        candidate: event.candidate
                    };

                    this.clientFacade.sendCandidate(data);
                }
            };

            peerConnection.onicecandidateerror = error => {
                this.clientFacade.logCandidateError(streamId, error);
            }

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
