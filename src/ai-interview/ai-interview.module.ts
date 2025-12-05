import { Module } from '@nestjs/common';
import { AiInterviewController } from './ai-interview.controller.js';
import { AiInterviewService } from './ai-interview.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AiInterviewService],
  controllers: [AiInterviewController],
  exports: [AiInterviewService],
})
export class AiInterviewModule {}
