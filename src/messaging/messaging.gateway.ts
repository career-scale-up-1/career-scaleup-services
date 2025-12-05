import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from './dto/messaging.dto.js';
import { MessagingService } from './messaging.service.js';

@WebSocketGateway({ cors: true })
export class MessagingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagingService: MessagingService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagingService.sendMessage(dto);

    this.server.to(dto.conversationId).emit('newMessage', message);
    return message
  }

  handleConnection(client: Socket) {
    const { conversationId } = client.handshake.query;
    if (conversationId) client.join(conversationId as string);
  }
}
