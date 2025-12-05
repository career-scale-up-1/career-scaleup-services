import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto.js';

export class LocationDto {
  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() city?:
    | string
    | null;
  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() state?:
    | string
    | null;
  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() country?:
    | string
    | null;
}

export class BasicsDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() title?:
    | string
    | null;

  @ApiProperty() @IsString() email: string;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() phone?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() website?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() linkedin?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() github?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() summary?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto | null;
}

export class SkillsDto {
  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  frameworks?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  databases?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tools?: string[];

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  other?: string[];
}

export class EducationDto {
  @ApiProperty() @IsString() institution: string;
  @ApiProperty() @IsString() degree: string;
  @ApiProperty() @IsString() fieldOfStudy: string;
  @ApiProperty() @IsDateString() startDate: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date | null;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  details?: string[];
}

export class ExperienceDto {
  @ApiProperty() @IsString() position: string;

  @ApiProperty() @IsString() company: string;

  @IsOptional() @IsString() organization?: string | null;

  @ApiProperty() @IsDateString() @Type(() => Date) startDate: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() location?:
    | string
    | null;
}

export class ProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() link?:
    | string
    | null;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ nullable: true })
  @IsDateString()
  startDate: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date | null;

  @ApiPropertyOptional({ type: Array<String>, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];
}

export class AwardDto {
  @ApiProperty() @IsString() title: string;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() issuer?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsInt() year?:
    | string
    | null;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() details?:
    | string
    | null;
}

export class CertificationDto {
  @ApiProperty() @IsString() name: string;

  @ApiPropertyOptional({ nullable: true }) @IsOptional() @IsString() issuer?:
    | string
    | null;
  @ApiProperty() @IsDateString() issueDate: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  expiryDate?: Date | null;

  @ApiPropertyOptional() @IsOptional() @IsString() credentialUrl?:
    | string
    | null;
}

export class LanguageDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() proficiency: string;
}

export class VolunteeringDto {
  @ApiProperty() @IsString() organization: string;

  @ApiProperty() @IsString() role: string;

  @ApiProperty() @IsDateString() startDate: Date;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class CreateResumeDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => BasicsDto)
  basics: BasicsDto;

  @ApiPropertyOptional({ type: SkillsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SkillsDto)
  skills?: SkillsDto;

  @ApiPropertyOptional({ type: Array<EducationDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  educations?: EducationDto[];

  @ApiPropertyOptional({ type: Array<ExperienceDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences?: ExperienceDto[];

  @ApiPropertyOptional({ type: Array<ProjectDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectDto[];

  @ApiPropertyOptional({ type: Array<AwardDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardDto)
  awards?: AwardDto[];

  @ApiPropertyOptional({ type: Array<CertificationDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  certifications?: CertificationDto[];

  @ApiPropertyOptional({ type: Array<LanguageDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @ApiPropertyOptional({ type: Array<VolunteeringDto> })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VolunteeringDto)
  volunteerings?: VolunteeringDto[];

  @ApiPropertyOptional({ type: Array<String> })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];
}

export class AnalyzeResumePayload {
  resume: any;
  job?: JobDto;
}
