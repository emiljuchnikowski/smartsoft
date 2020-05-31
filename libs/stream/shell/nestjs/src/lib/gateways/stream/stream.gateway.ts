import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  transports: ["websocket"],
  path: "/" + process.env.URL_PREFIX + "/_socket",
  namespace: "/" + process.env.URL_PREFIX
})
export class StreamGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  clients = {};
  senders = {};

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage("register")
  handleEvent(
    @MessageBody() data: { streamId: string; mode: "sender" | "client" },
    @ConnectedSocket() client: Socket
  ): void {
    if (data.mode === "client") {
      this.addClient(client.id, data.streamId);
    }

    if (data.mode === "sender") {
      this.addSender(client.id, data.streamId);
    }
  }

  afterInit(server: any): void {
    console.log("StreamGateway Init");
  }

  handleConnection(client: any, ...args: any[]): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  private addClient(clientId: string, streamId: string): void {
    if (!this.clients[streamId]) {
      this.clients[streamId] = {};
    }

    this.clients[streamId][clientId] = {};
  }

  private addSender(senderId: string, streamId: string): void {
    if (!this.senders[streamId]) {
      this.senders[streamId] = {};
    }

    this.senders[streamId][senderId] = {};
  }
}
