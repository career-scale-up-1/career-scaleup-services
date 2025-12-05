import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobDto } from '../../job/dto/job.dto.js';

export class GeneratedCoverLetterDto {
  cover_letter: {
    applicant: {
      full_name: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string;
      github: string;
    };
    employer: {
      company_name: string;
      position_title: string;
      recruiter_name?: string | null;
      company_address?: string | null;
    };
    letter: {
      date: string;
      content: string;
      signature: {
        closing_line: string;
        name: string;
      };
    };
  };
}

export class GenerateCoverLetterPayload {
  @ApiProperty()
  resume: any;

  @ApiPropertyOptional()
  job?: JobDto;

  @ApiPropertyOptional()
  jobDescription?: string;

  @ApiPropertyOptional()
  jobTitle?: string;

  @ApiProperty()
  company: string;
}

export class GenerateCoverLetterDTO {
  @ApiProperty({ enum: ['mode-1', 'mode-2'], example: 'mode-1' })
  mode: 'mode-1' | 'mode-2';

  @ApiProperty()
  payload: GenerateCoverLetterPayload;
}

export class CreateCoverLetterDTO {
  title: string;
  seekerId: string;
  applicant: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
  };
  employer: {
    company_name: string;
    position_title: string;
    recruiter_name?: string | null;
    company_address?: string | null;
  };
  letter: {
    date: string;
    content: string;
    signature: {
      closing_line: string;
      name: string;
    };
  };
}

export class CoverLetterDTO {
  id: string;
  seekerId: string;

  title: string;

  applicant: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
  };
  employer: {
    companyName: string;
    positionTitle: string;
    recruiterName?: string | null;
    companyAddress?: string | null;
  };
  letter: {
    date: string;
    content: string;
    signature: {
      closingLine: string;
      name: string;
    };
  };
}
