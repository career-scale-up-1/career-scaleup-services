import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export enum ApplicationStatus {
  Applied = 'Applied',
  ShortListed = 'ShortListed',
  Hired = 'Hired',
  Rejected = 'Rejected',
  Withdraw = 'Withdraw',
}

export class ApplicationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  jobId: string;

  @ApiProperty()
  seekerId: string;

  @ApiProperty({ required: false, type: String, nullable: true, example: '' })
  coverLetter?: string | null;

  @ApiProperty({ required: false, type: String, nullable: true, example: '' })
  resumeUrl?: string | null;

  @ApiProperty({enum: ApplicationStatus})
  status: ApplicationStatus

  @ApiProperty()
  appliedAt: Date;
}

export class CreateApplicationDTO {
  @ApiProperty({ example: 'cjv9abc123xyz' })
  jobId: string;

  @ApiProperty({ example: 'd3307e59-0c73-4156-9855-b52dd3aa903e' })
  seekerId: string;

  @ApiProperty({ required: false, type: String, nullable: true, example: '' })
  @IsOptional()
  coverLetter?: string | null;

  @ApiProperty({ required: false, type: String, nullable: true, example: '' })
  @IsOptional()
  resumeUrl?: string | null;

  @ApiProperty({ enum: ApplicationStatus, example: ApplicationStatus.Applied })
  status: ApplicationStatus;
}

export class UpdateApplicationStatusDTO {
  @ApiProperty({ example: '1' })
  applicationId: string;

  @ApiProperty({ enum: ApplicationStatus, example: ApplicationStatus.Applied })
  status: ApplicationStatus;
}
