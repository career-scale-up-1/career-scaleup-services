import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Job } from 'generated/prisma/browser.js';

type WorkType = 'Onsite' | 'Hybrid' | 'Remote';

type JobStatus = 'Open' | 'Closed';

export class JobDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  recruiterId: string;

  @ApiProperty()
  companyName: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  companyLogo?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  companyWebsite?: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  jobType: string;

  @ApiProperty({
    enum: ['Onsite', 'Hybrid', 'Remote'],
    example: 'Onsite',
  })
  workType: WorkType;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  qualifications?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  benefits?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  responsibilities?: string[];

  @ApiProperty({ enum: ['Open', 'Closed'], example: 'Open' })
  status: JobStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  location?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  hourlyRate?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  fixedBudget?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMin?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMax?: number | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  applicationLink?: string | null;

  @ApiProperty()
  postedAt: Date;
}

export interface ExternalJobDto extends Omit<JobDto, 'recruiterId'> {}

export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  jobType: string;

  @ApiProperty({
    enum: ['Onsite', 'Hybrid', 'Remote'],
    example: 'Onsite',
  })
  workType: WorkType;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  qualifications?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  benefits?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  responsibilities?: string[];

  @ApiProperty({ enum: ['Open', 'Closed'], example: 'Open' })
  status: JobStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  location?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  hourlyRate?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  fixedBudget?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMin?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMax?: number | null;
}

export class UpdateJobDto {
  @ApiProperty()
  recruiterId: string;

  @ApiProperty()
  companyName: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  companyLogo?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  companyWebsite?: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  jobType: string;

  @ApiProperty({
    enum: ['Onsite', 'Hybrid', 'Remote'],
    example: 'Onsite',
  })
  workType: WorkType;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  qualifications?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  benefits?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  responsibilities?: string[];

  @ApiProperty({ enum: ['Open', 'Closed'], example: 'Open' })
  status: JobStatus;

  @ApiPropertyOptional({ type: String, nullable: true })
  location?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  hourlyRate?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  fixedBudget?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMin?: number | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  salaryMax?: number | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  applicationLink?: string | null;

  @ApiProperty()
  postedAt: Date;
}

export class UpdateJobStatus {
  @ApiProperty()
  jobId: string;

  @ApiProperty({ enum: ['Open', 'Closed'], example: 'Open' })
  status: 'Open' | 'Closed';
}
