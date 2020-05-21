import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from "@nestjs/websockets";
import { Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  path: '/' + process.env.URL_PREFIX + '/_socket',
  namespace: '/' + process.env.URL_PREFIX
})
export class CrudGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @SubscribeMessage("filter")
  handleEvent(
      @MessageBody() data,
      @ConnectedSocket() client: Socket
  ): void {
    const event = 'read';
    const response = [1, 2, 3];

    client.emit('read', response);
  }

  afterInit(server: any) {
    console.log('Init');
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
