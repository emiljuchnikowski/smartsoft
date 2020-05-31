import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway({
    transports: ["websocket"],
    path: "/" + process.env.URL_PREFIX + "/_socket",
    namespace: "/" + process.env.URL_PREFIX
})
export class StreamGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server

    afterInit(server: any): void {
        console.log("StreamGateway Init");
    }

    handleConnection(client: any, ...args: any[]): void {
        console.log(args)
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any): void {
        console.log(`Client disconnected: ${client.id}`);
    }
}
