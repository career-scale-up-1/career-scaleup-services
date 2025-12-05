import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  async createConversation(conversation: CreateConversationDto) {
    const existing = await this.prisma.conversation.findUnique({
      where: { applicationId: conversation.applicationId },
    });

    if (existing) return existing;

    return this.prisma.conversation.create({
      data: {
        applicationId: conversation.applicationId,
        participants: {
          create: [
            { userId: conversation.recruiterId },
            { userId: conversation.seekerId },
          ],
        },
      },
      include: {
        participants: true,
      },
    });
  }

  async sendMessage(dto: SendMessageDto) {
    return this.prisma.message.create({
      data: {
        conversationId: dto.conversationId,
        senderId: dto.senderId,
        content: dto.content,
      },
    });
  }

  async getMessages(conversationId: string, limit = 50) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
  }

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: { participants: { include: { user: true } }, messages: true },
    });
  }
}
