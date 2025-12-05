import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  AnalyzeResumePayload,
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
} from './dto/resume.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { JobDto } from '../job/dto/job.dto.js';

type ModelMap = {
  skills: SkillsDto;
  education: EducationDto;
  experience: ExperienceDto;
  project: ProjectDto;
  award: AwardDto;
  certification: CertificationDto;
};

@Injectable()
export class ResumeService {
  private readonly baseMicroServiceUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {
    this.baseMicroServiceUrl = process.env.BASE_MICROSERVICE_URL!;
  }

  async createEmptyResume(data: any, userId: string) {
    return await this.prisma.resume.create({
      data: { userId, ...data },
    });
  }

  async getResume(id: string) {
    return await this.prisma.resume.findUnique({
      where: { id },
      include: {
        basics: true,
        skills: true,
        educations: true,
        experiences: true,
        projects: true,
        awards: true,
        certifications: true,
        languages: true,
        volunteerings: true,
      },
    });
  }

  async getAllResumes(userId: string) {
    return await this.prisma.resume.findMany({
      where: { userId },
      include: {
        basics: true,
        skills: true,
        educations: true,
        experiences: true,
        projects: true,
        awards: true,
        certifications: true,
        languages: true,
        volunteerings: true,
      },
    });
  }

  async createResume(userId: string, dto: CreateResumeDto, isOptimized = false) {
    await this.prisma.resume.updateMany({
      where: { userId },
      data: { isActive: false },
    });

    console.log(isOptimized)

    const resume = await this.prisma.resume.create({
      data: {
        userId,
        hobbies: dto.hobbies || [],
        isActive: true,
        isOptimized,
        basics: {
          create: {
            fullName: dto.basics.fullName,
            title: dto.basics.title,
            email: dto.basics.email,
            phone: dto.basics.phone,
            website: dto.basics.website,
            linkedin: dto.basics.linkedin,
            github: dto.basics.github,
            summary: dto.basics.summary,

            ...(dto.basics.location && {
              location: {
                create: {
                  city: dto.basics.location.city,
                  state: dto.basics.location.state,
                  country: dto.basics.location.country,
                },
              },
            }),
          },
        },
        ...(dto.skills && {
          skills: {
            create: {
              languages: dto.skills.languages || [],
              frameworks: dto.skills.frameworks || [],
              databases: dto.skills.databases || [],
              tools: dto.skills.tools || [],
              other: dto.skills.other || [],
            },
          },
        }),
      },
    });

    const createManyWithResumeId = async (
      items: any[] | undefined,
      model: any,
    ) => {
      if (!items?.length) return;

      const data = items.map((item) => {
        const processed = { ...item, resumeId: resume.id };

        for (const key of Object.keys(processed)) {
          if (key.toLowerCase().includes('date') && processed[key]) {
            processed[key] = new Date(processed[key]);
          }
        }

        return processed;
      });

      await model.createMany({ data });
    };

    await Promise.all([
      createManyWithResumeId(dto.educations, this.prisma.education),
      createManyWithResumeId(dto.experiences, this.prisma.experience),
      createManyWithResumeId(dto.projects, this.prisma.project),
      createManyWithResumeId(dto.awards, this.prisma.award),
      createManyWithResumeId(dto.certifications, this.prisma.certification),
      createManyWithResumeId(dto.languages, this.prisma.language),
      createManyWithResumeId(dto.volunteerings, this.prisma.volunteering),
    ]);

    return this.prisma.resume.findUnique({
      where: { id: resume.id },
      include: {
        basics: { include: { location: true } },
        skills: true,
        educations: true,
        experiences: true,
        projects: true,
        awards: true,
        certifications: true,
        languages: true,
        volunteerings: true,
      },
    });
  }

  async deleteResume(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id, userId },
    });
    if (!resume)
      throw new ForbiddenException('You are not allowed to delete this resume');
    return await this.prisma.resume.delete({ where: { id, userId } });
  }

  async updateBasics(id: string, data: BasicsDto): Promise<BasicsDto> {
    const { location, ...rest } = data;

    return await this.prisma.basics.update({
      where: { resumeId: id },
      data: {
        ...rest,
        location: location
          ? {
              upsert: {
                update: location,
                create: location,
              },
            }
          : undefined,
      },
      include: { location: true },
    });
  }

  async updateEntity<K extends keyof ModelMap>(
    model: K,
    id: string,
    data: ModelMap[K],
  ) {
    //@ts-ignore
    return await this.prisma[model].update({
      where: { id },
      data,
    });
  }

  async addEntityToResume<K extends keyof ModelMap>(
    model: K,
    resumeId: string,
    data: ModelMap[K],
  ) {
    //@ts-ignore
    return await this.prisma[model].create({
      data: { ...data, resumeId },
    });
  }

  async updateSkills(id: string, data: SkillsDto): Promise<SkillsDto> {
    return await this.prisma.skills.update({
      where: { id },
      data,
    });
  }

  async updateEducation(id: string, data: EducationDto): Promise<EducationDto> {
    return await this.prisma.education.update({
      where: { id },
      data,
    });
  }

  async updateExperience(
    id: string,
    data: ExperienceDto,
  ): Promise<ExperienceDto> {
    return await this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  async updateProject(id: string, data: ProjectDto): Promise<ProjectDto> {
    return await this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async updateAward(id: string, data: AwardDto): Promise<AwardDto> {
    return await this.prisma.award.update({
      where: { id },
      data,
    });
  }

  async updateCertification(
    id: string,
    data: CertificationDto,
  ): Promise<CertificationDto> {
    return await this.prisma.certification.update({
      where: { id },
      data,
    });
  }

  async updateLanguages(id: string, data: LanguageDto) {
    return await this.prisma.language.update({
      where: { id },
      data,
    });
  }

  async updateVolunteering(
    id: string,
    data: VolunteeringDto,
  ): Promise<VolunteeringDto> {
    return await this.prisma.volunteering.update({
      where: { id },
      data,
    });
  }

  async parsePdf(userId: string, file: Express.Multer.File, token: String) {
    const pdf = new PDFParse({ data: file.buffer });
    const result = await pdf.getText();

    // const resume = await firstValueFrom(
    //   this.httpService.post(
    //     `${this.baseMicroServiceUrl}/api/v1/resume/extract/`,
    //     { resumeText: result.text },
    //   ),
    // );

    // console.log(resume)

    // console.log("resume: respnse",resume)

    // const createdResume = await this.createResume(userId, );

    // const resumeId = createdResume?.id;

    return { resumeId: 'resume', text: result.text };
  }

  async parseDocument(userId: string, file: Express.Multer.File) {
    const parsedText = await mammoth.extractRawText({ buffer: file.buffer });

    const resume = await firstValueFrom(
      this.httpService.post(
        `${this.baseMicroServiceUrl}/api/v1/resume/extract`,
        {
          resumeText: parsedText.value,
        },
      ),
    );

    const createdResume = await this.createResume(
      userId,
      resume.data as CreateResumeDto,
    );

    return { text: parsedText.value };
  }

  async analyzeResume(payload: AnalyzeResumePayload) {
    const { resume, job } = payload;

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/ai/`, {
          mode: 'analyze',
          resume,
          ...(job && { job }),
        })
        .pipe(map((response) => response.data)),
    );

    return response;
  }

  async optimizeResume(userId: string, resume: any, job: JobDto) {
    console.log(resume)
    const response = await firstValueFrom(
      this.httpService
        .post(`${this.baseMicroServiceUrl}/api/v1/ai/`, {
          mode: 'rewrite',
          resume,
          job,
        })
        .pipe(map((response) => response.data)),
    );

    const newResume = {
      basics: response.sections.basics.optimized_content,
      skills: response.sections.skills.optimized_content,
      educations: response.sections.educations.optimized_content,
      experiences: response.sections.experiences.optimized_content,
      projects: response.sections.projects.optimized_content,
      awards: response.sections.awards.optimized_content,
      certifications: response.sections.certifications.optimized_content,
      languages: response.sections.languages.optimized_content,
      volunteerings: response.sections.volunteerings.optimized_content,
    };

    const optimizedResume = await this.createResume(userId, newResume, true);

    return {
      optimizedResumeResponse: response,
      optimizedResumeId: optimizedResume?.id,
    };
  }

  async setResumeActive(userId: string, resumeId: string) {
    await this.prisma.resume.updateMany({
      where: { userId },
      data: { isActive: false },
    });

    const activeResume = await this.prisma.resume.update({
      where: { id: resumeId },
      data: {
        isActive: true,
      },
    });

    console.log(activeResume)

    return activeResume;
  }
}
