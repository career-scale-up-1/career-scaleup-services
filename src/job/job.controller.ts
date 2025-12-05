import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
import {
  CreateJobDto,
  JobDto,
  UpdateJobDto,
  UpdateJobStatus,
} from './dto/job.dto.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Roles(Role.Recruiter)
  @Post('create')
  async createJob(@Body() body: CreateJobDto, @Req() req) {
    return this.jobService.createJob(req.user.userId, body);
  }

  @Roles(Role.Recruiter)
  @Patch(':id/update')
  async updateJob(
    @Param('id') id: string,
    @Body() jobDto: UpdateJobDto,
    @Req() req,
  ) {
    const recruiterId = req.user.userId;
    return this.jobService.updateJob(id, recruiterId, { ...jobDto });
  }

  @Roles(Role.Seeker)
  @Get()
  async getJobs(
    @Query('query') query: string = 'all',
    @Query('country') country: string = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('num_pages', new DefaultValuePipe(1), ParseIntPipe)
    num_pages: number,
    @Query('date_posted') date_posted: string = 'all',
    @Req() req,
  ) {
    return this.jobService.getJobs(
      req.user.userId,
      query,
      country,
      page,
      num_pages,
      date_posted,
    );
  }

  @Get('saved')
  getSavedJobs(@Req() req) {
    const userId = req.user.userId;
    return this.jobService.getSavedJobs(userId);
  }

  @Get('matched')
  @Roles(Role.Seeker)
  getMatchedJobs(@Req() req) {
    return this.jobService.getJobs(req.user.userId, 'all', '', 1, 1, 'all');
  }

  @Get('postedJobs')
  @Roles(Role.Recruiter)
  async getPostedJobs(@Req() req) {
    return this.jobService.getPostedJobs(req.user.userId);
  }

  @Get(':id')
  @Roles(Role.Seeker)
  async getJobById(@Param('id') id: string) {
    return this.jobService.getJobById(id);
  }

  @Post('save')
  @Roles(Role.Seeker)
  saveJob(
    @Req() req: any,
    @Body('job') job: any,
    @Body('source') source: 'internal' | 'external',
  ) {
    const userId = req.user.userId;
    return this.jobService.saveJob(userId, job, source);
  }

  @Patch('updateStatus')
  @Roles(Role.Recruiter)
  async updateJobStatus(@Body() body: UpdateJobStatus, @Req() req) {
    return this.jobService.updateJobStatus(
      req.user.userId,
      body.jobId,
      body.status,
    );
  }

  @Delete(':id')
  @Roles(Role.Recruiter)
  async deleteJob(@Param('id') jobId: string) {
    return this.jobService.deleteJob(jobId);
  }
}
