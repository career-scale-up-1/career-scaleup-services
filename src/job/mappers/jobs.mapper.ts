import { JobDto } from '../dto/job.dto.js';

type JobResponseDto = Omit<JobDto, 'recruiterId'> & {
  source: 'internal' | 'external';
  easyApplied: boolean;
};

export class JobMapper {
  static fromAPIResponse(data: any): JobResponseDto {
    return {
      id: data.job_id,

      companyName: data.employer_name,
      companyLogo: data.employer_logo,
      companyWebsite: data.employer_website,

      title: data.job_title,
      jobType: data.job_employment_type,
      workType: 'Onsite',
      description: data.job_description,

      qualifications: data.job_highlights?.Qualifications || [],
      benefits: data.job_highlights?.Benefits || [],
      responsibilities: data.job_highlights?.Responsibilities || [],
      status: 'Open',

      location: data.job_location,
      hourlyRate: data.job_hourly_rate,
      fixedBudget: data.job_fixed_budget,

      salaryMin: data.job_salary_min,
      salaryMax: data.job_salary_max,

      applicationLink: data.job_apply_link,
      source: 'external',
      easyApplied: false,

      postedAt: data.job_posted_at_timestamp,
    };
  }
}
