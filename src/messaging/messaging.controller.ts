import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagingService } from './messaging.service.js';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto.js';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('conversation')
  createConversation(@Body() conversation: CreateConversationDto) {
    return this.messagingService.createConversation(conversation);
  }

  @Post('message')
  sendMessage(@Body() dto: SendMessageDto) {
    return this.messagingService.sendMessage(dto);
  }

  @Get('conversation/:userId')
  getConversations(@Param('userId') userId: string) {
    return this.messagingService.getConversations(userId);
  }

  @Get('messages/:conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messagingService.getMessages(conversationId);
  }
}
