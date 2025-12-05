import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service.js';
import { ResumeController } from './resume.controller.js';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [ResumeService],
  controllers: [ResumeController],
  exports: [ResumeService],
})
export class ResumeModule {}
