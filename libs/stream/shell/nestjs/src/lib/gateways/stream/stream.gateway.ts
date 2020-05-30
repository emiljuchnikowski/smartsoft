import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway} from "@nestjs/websockets";

@WebSocketGateway({
    transports: ["websocket"],
    path: "/" + process.env.URL_PREFIX + "/_socket",
    namespace: "/" + process.env.URL_PREFIX
})
export class StreamGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    afterInit(server: any): void {
        console.log("StreamGateway Init");
    }

    handleConnection(client: any, ...args: any[]): void {
        console.log(`Client disconnected: ${client.id}`);
    }

    handleDisconnect(client: any): void {
        console.log(`Client connected: ${client.id}`);
    }
}
