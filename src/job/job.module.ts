import { Module } from '@nestjs/common';
import { JobController } from './job.controller.js';
import { JobService } from './job.service.js';
import { JobMatchingService } from './job.matching.service.js';

@Module({
  providers: [JobService, JobMatchingService],
  controllers: [JobController],
  exports: [JobService, JobMatchingService],
})
export class JobModule {}
