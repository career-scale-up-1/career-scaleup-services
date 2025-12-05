import { Module } from '@nestjs/common';
import { MessagingGateway } from './messaging.gateway.js';
import { MessagingService } from './messaging.service.js';
import { MessagingController } from './messaging.controller.js';

@Module({
  imports: [],
  providers: [MessagingGateway, MessagingService],
  controllers: [MessagingController],
})
export class MessagingModule {}
