import { Body, Controller, Post, Patch, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import {
  CreateApplicationDTO,
  UpdateApplicationStatusDTO,
} from './dto/applications.dto.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('Bearer')
@Controller('application')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles(Role.Seeker)
  @Post('create')
  async createApplication(@Body() body: CreateApplicationDTO) {
    return this.applicationsService.createApplication(body);
  }

  @Roles(Role.Seeker, Role.Recruiter)
  @Patch('update')
  async updateApplicationStatus(@Req() req, @Body() body: UpdateApplicationStatusDTO) {
    return this.applicationsService.changeApplicationStatus(
      req.user.userId,
      body.applicationId,
      body.status,
    );
  }
}
