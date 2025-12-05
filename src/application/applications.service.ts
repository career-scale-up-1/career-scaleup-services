import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ApplicationStatus,
  CreateApplicationDTO,
} from './dto/applications.dto.js';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApplication(application: CreateApplicationDTO) {
    return await this.prismaService.application.create({ data: application });
  }

  async changeApplicationStatus(
    userId: string,
    applicationId: string,
    status: ApplicationStatus,
  ) {
    const application = await this.prismaService.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!application) throw new Error('Application not found');

    if (status === ApplicationStatus.Hired && application.job) {
      await this.prismaService.profileExperience.create({
        data: {
          userId: userId,
          position: application.job.title,
          companyName: application.job.companyName,
          startDate: new Date(),
          endDate: null,
          description: '',
        },
      });
    }

    return await this.prismaService.application.update({
      where: { id: applicationId },
      data: { status },
    });
  }
}
