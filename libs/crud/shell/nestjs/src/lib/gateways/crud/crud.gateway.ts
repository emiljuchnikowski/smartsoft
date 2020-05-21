import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { CrudService } from "@smartsoft001/crud-shell-app-services";
import { IEntity } from "@smartsoft001/domain-core";

@WebSocketGateway({
  transports: ["websocket"],
  path: "/" + process.env.URL_PREFIX + "/_socket",
  namespace: "/" + process.env.URL_PREFIX
})
export class CrudGateway<T extends IEntity<string>>
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private service: CrudService<T>) {}

  @SubscribeMessage("filter")
  handleEvent(@MessageBody() data: { id?: string }, @ConnectedSocket() client: Socket): void {
    const sub = this.service.changes(data).subscribe(res => {
      client.emit("changes", res);

    });
  }

  afterInit(server: any) {
    console.log("CrudGateway Init");
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
