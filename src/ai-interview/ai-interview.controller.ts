import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import { AiInterviewService } from './ai-interview.service.js';
import { JobDto } from '../job/dto/job.dto.js';
import {
  AnswerDTO,
  CreateAiInterviewDTO,
  EvaluateInterviewDTO,
  QuestionDTO,
} from './dto/ai-interview.dto.js';

@Roles(Role.Seeker)
@Controller('ai-interview')
export class AiInterviewController {
  constructor(private readonly aiInterviewService: AiInterviewService) {}

  @Get()
  async getInterviews(@Req() req) {
    return this.aiInterviewService.getInterviews(req.user.userId);
  }

  @Get(':id')
  async getInterviewById(@Req() req, @Param('id') interviewId: string) {
    return this.aiInterviewService.getInterviewById(
      req.user.userId,
      interviewId,
    );
  }

  @Post('create')
  createInterview(@Body() body: CreateAiInterviewDTO) {
    return this.aiInterviewService.createInterview(body.resumeId, body.job);
  }

  @Post(':id/evaluate')
  evaluateInterview(
    @Param('id') interviewId: string,
    @Body()
    body: EvaluateInterviewDTO,
  ) {
    return this.aiInterviewService.evaluateInterview(
      interviewId,
      body.resumeId,
      body.questions,
      body.answers,
    );
  }

  @Delete(':id')
  async deleteInterview(@Param('id') interviewId: string) {}
}
