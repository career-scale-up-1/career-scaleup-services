import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service.js';
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
} from './dto/resume.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('resumes')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly prismaService: PrismaService,
  ) {}

  @Roles(Role.Seeker)
  @Get()
  async getAllResumes(@Req() req) {
    return await this.resumeService.getAllResumes(req.user.userId);
  }

  @Roles(Role.Seeker, Role.Recruiter)
  @Get(':id')
  async getResume(@Param('id') id: string, @Req() req) {
    const resume = await this.resumeService.getResume(id);
    if (!resume)
      throw new ForbiddenException('You  are not allowed to view this resume');
    return resume;
  }

  @Roles(Role.Seeker)
  @Post('create')
  async createResume(@Req() req, @Body() createResumeDto: CreateResumeDto) {
    const profile = await this.prismaService.users.findUnique({
      where: { id: req.user.userId },
    });

    if (!profile) return { message: "User doesn't exist" };

    createResumeDto.basics = {
      fullName: profile.fullName,
      title: profile.profession,
      email: profile.email,
      phone: profile.phoneNumber,
      website: profile.website,
    };

    return await this.resumeService.createResume(
      req.user.userId,
      createResumeDto,
    );
  }

  @Roles(Role.Seeker)
  @Post()
  async createEmptyResume(@Body() body, @Req() req) {
    return await this.resumeService.createResume(req.user.userId, body);
  }

  @Roles(Role.Seeker)
  @Patch('basics/:id')
  async updateBasics(@Param('id') id: string, @Body() body: BasicsDto) {
    return await this.resumeService.updateBasics(id, body);
  }

  // @Roles(Role.Seeker)
  // @Patch(':id/skills')
  // async updateSkills(@Param('id') id: string, @Body() body: SkillsDto) {
  //   return await this.resumeService.updateSkills(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/educations')
  // async updateEducation(@Param('id') id: string, @Body() body: EducationDto) {
  //   return await this.resumeService.updateEducation(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/experiences')
  // async updateExperience(@Param('id') id: string, @Body() body: ExperienceDto) {
  //   return await this.resumeService.updateExperience(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/projects')
  // async updateProject(@Param('id') id: string, @Body() body: ProjectDto) {
  //   return await this.resumeService.updateProject(id, body);
  // }

  @Roles(Role.Seeker)
  @Patch(':model/:id')
  async updateEntity(
    @Param('model') model: string,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const allowedModels = [
      'skills',
      'education',
      'experience',
      'project',
      'award',
      'certification',
    ] as const;

    if (!allowedModels.includes(model as any)) {
      throw new BadRequestException(`Invalid model name: ${model}`);
    }

    return await this.resumeService.updateEntity(model as any, id, body);
  }

  @Roles(Role.Seeker)
  @Post(':model/:resumeId')
  async addEntity(
    @Param('model') model: string,
    @Param('resumeId') resumeId: string,
    @Body() body: any,
  ) {
    const allowedModels = [
      'skills',
      'education',
      'experience',
      'project',
      'award',
      'certification',
      'language',
      'volunteering',
    ] as const;

    if (!allowedModels.includes(model as any)) {
      throw new BadRequestException(`Invalid model name: ${model}`);
    }

    return await this.resumeService.addEntityToResume(
      model as any,
      resumeId,
      body,
    );
  }

  // @Roles(Role.Seeker)
  // @Patch(':id/awards')
  // async updateAward(@Param('id') id: string, @Body() body: AwardDto) {
  //   return await this.resumeService.updateAward(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/certifications')
  // async updateCertification(
  //   @Param('id') id: string,
  //   @Body() body: CertificationDto,
  // ) {
  //   return await this.resumeService.updateCertification(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/languages')
  // async updateLanguages(@Param('id') id: string, @Body() body: LanguageDto) {
  //   return await this.resumeService.updateLanguages(id, body);
  // }

  // @Roles(Role.Seeker)
  // @Patch(':id/volunteerings')
  // async updateVolunteering(
  //   @Param('id') id: string,
  //   @Body() body: VolunteeringDto,
  // ) {
  //   return await this.resumeService.updateVolunteering(id, body);
  // }

  @Roles(Role.Seeker)
  @Delete('delete/:id')
  async deleteResume(@Param('id') id: string, @Req() req) {
    return await this.resumeService.deleteResume(id, req.user.userId);
  }

  @Roles(Role.Seeker)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file  Uploaded');

    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.user.userId;

    const mimeType = file.mimetype;

    if (mimeType === 'application/pdf') {
      return this.resumeService.parsePdf(userId, file, token);
    } else if (
      mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return this.resumeService.parseDocument(userId, file);
    } else {
      throw new BadRequestException(
        'Unsupported file type. Upload PDF or DOCX.',
      );
    }
  }

  @Roles(Role.Seeker)
  @Post('analyze')
  async analyzeResume(@Body() body) {
    return this.resumeService.analyzeResume(body);
  }

  @Roles(Role.Seeker)
  @Post('optimize')
  async optimizeResume(@Body() body, @Req() req) {
    return this.resumeService.optimizeResume(
      req.user.userId,
      body.resume,
      body.job,
    );
  }

  @Roles(Role.Seeker)
  @Patch('setActive')
  async setResumeActive(@Body() body, @Req() req) {
    return this.resumeService.setResumeActive(req.user.userId, body.resumeId);
  }
}
