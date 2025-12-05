import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  senderId: string;
}

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recruiterId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  seekerId: string;
}
