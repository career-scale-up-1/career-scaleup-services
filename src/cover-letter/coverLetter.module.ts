import { Module } from '@nestjs/common';
import { CoverLetterService } from './coverLetter.service.js';
import { CoverLetterController } from './coverLetter.controller.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CoverLetterService],
  controllers: [CoverLetterController],
  exports: [CoverLetterService],
})
export class CoverLetterModule {}
