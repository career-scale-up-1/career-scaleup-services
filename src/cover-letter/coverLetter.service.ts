import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateCoverLetterDTO,
  GenerateCoverLetterDTO,
  GeneratedCoverLetterDto,
} from './dto/cover-letter.dto.js';

@Injectable()
export class CoverLetterService {
  private readonly baseMicroServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.baseMicroServiceUrl = process.env.BASE_MICROSERVICE_URL!;
  }

  async getCoverLetters(userId: string) {
    return await this.prismaService.cover_Letter.findMany({
      where: { seekerId: userId },
    });
  }

  async generateCoverLetter(userId: string, body: GenerateCoverLetterDTO) {
    const { mode, payload } = body;
    const { resume, job, jobDescription, jobTitle, company } = payload;

    const requestPayload =
      mode === 'mode-1'
        ? { resume, job, company:"test" }
        : { resume, jobDescription, jobTitle, company };

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/cover-letter/generate/`, {
          mode,
          payload: { ...requestPayload },
        })
        .pipe(map((response) => response.data as GeneratedCoverLetterDto)),
    );

    const coverLetter = response.cover_letter;

    const createdCoverLetter = await this.saveCoverLetter({
      title: `${coverLetter.employer.position_title}: ${coverLetter.employer.company_name} Cover Letter`,
      seekerId: userId,
      ...coverLetter,
    });

    return createdCoverLetter;
  }

  async saveCoverLetter(coverLetter: CreateCoverLetterDTO) {
    return await this.prismaService.cover_Letter.create({ data: coverLetter });
  }
}
