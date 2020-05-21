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
import {Subscription} from "rxjs";
import {Guid} from "guid-typescript";

@WebSocketGateway({
  transports: ["websocket"],
  path: "/" + process.env.URL_PREFIX + "/_socket",
  namespace: "/" + process.env.URL_PREFIX
})
export class CrudGateway<T extends IEntity<string>>
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private _filters: Array<{
    clientId: string,
    filterId: string,
    subscription: Subscription
  }> = [];

  constructor(private service: CrudService<T>) {}

  @SubscribeMessage("filter")
  handleFilter(@MessageBody() data: { id?: string }, @ConnectedSocket() client: Socket): { filterId } {
    const subscription = this.service.changes(data).subscribe(res => {
      client.emit("changes", res);
    });

    const filter = {
      clientId: client.id,
      filterId: Guid.raw(),
      subscription
    };

    this._filters.push(filter);

    return {
      filterId: filter.filterId
    };
  }

  @SubscribeMessage("unsubscribe")
  handleUnsubscribe(@MessageBody() data: { filterId: string }): void {
    const filtersToRemove = this._filters.filter(f => f.filterId === data.filterId);

    filtersToRemove.forEach(f => {
      if (f.subscription && !f.subscription.closed)
        f.subscription.unsubscribe();
    });

    console.log("Unsubscribe filter: " + data.filterId);
  }

  afterInit(server: any) {
    console.log("CrudGateway Init");

    this._filters = [];
  }

  handleDisconnect(client: any) {
    const filtersToRemove = this._filters.filter(f => f.clientId === client.id);

    filtersToRemove.forEach(f => {
      if (f.subscription && !f.subscription.closed)
        f.subscription.unsubscribe();
    });

    console.log(`Client disconnected: ${client.id}, Removed filter: ${filtersToRemove.length}`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
