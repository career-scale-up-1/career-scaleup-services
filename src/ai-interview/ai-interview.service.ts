import { Injectable, NotFoundException } from '@nestjs/common';
import { JobDto } from '../job/dto/job.dto.js';
import {
  AwardDto,
  BasicsDto,
  CertificationDto,
  CreateResumeDto,
  EducationDto,
  ExperienceDto,
  LanguageDto,
  ProjectDto,
  SkillsDto,
  VolunteeringDto,
} from '../resume/dto/resume.dto.js';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { InterviewDTO, QuestionDTO, AnswerDTO, EvaluationDTO } from './dto/ai-interview.dto.js';

@Injectable()
export class AiInterviewService {
  private readonly apiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.apiBaseUrl = this.configService.get<string>('AI_API_BASE_URL')!;
  }

  async getInterviews(userId: string) {
    return this.prismaService.aI_Interview.findMany({
      where: { seekerId: userId },
    });
  }

  async getInterviewById(userId: string, interviewId: string) {
    return this.prismaService.aI_Interview.findUnique({
      where: { id: interviewId, seekerId: userId },
    });
  }

  async createInterview(resumeId: string, job: JobDto) {
    const resume = await this.prismaService.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) throw new NotFoundException(`Resume ${resumeId} not found`);

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.apiBaseUrl}/questions`, {
          resume,
          job,
        })
        .pipe(map((response) => response.data as InterviewDTO)),
    );

    const interview = await this.prismaService.aI_Interview.create({
      data: {
        resumeId: resume.id,
        jobId: job.id,
        seekerId: resume.userId,

        totalQuestions: response.totalQuestions,
        questions: JSON.parse(JSON.stringify(response.questions)),
      },
    });

    return interview;
  }

  async evaluateInterview(
    interviewId: string,
    resumeId: string,
    questions: QuestionDTO[],
    answers: AnswerDTO[],
  ) {
    const resume = await this.prismaService.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) throw new NotFoundException(`Resume ${resumeId} not found`);

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.apiBaseUrl}/evaluate`, {
          resume,
          questions,
          answers,
        })
        .pipe(map((response) => response.data as EvaluationDTO)),
    );

    const interviewUpdate = this.prismaService.aI_Interview.updateMany({
      where: { id: interviewId, resumeId: resumeId },
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        evaluationResult: JSON.parse(JSON.stringify(response)),
      },
    });

    return interviewUpdate;
  }

  async deleteInterview(id: string) {
    return this.prismaService.aI_Interview.delete({
      where: { id },
    });
  }
}
