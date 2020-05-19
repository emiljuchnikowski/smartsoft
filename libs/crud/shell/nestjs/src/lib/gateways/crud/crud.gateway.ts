import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

@WebSocketGateway({
  namespace: "_socket"
})
export class CrudGateway {
  @SubscribeMessage("read")
  handleEvent(@MessageBody() data): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: "events", data: item })));
  }
}
