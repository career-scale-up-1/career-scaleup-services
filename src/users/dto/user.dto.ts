import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StringFieldUpdateOperationsInput } from 'generated/prisma/models.js';
import type { Role } from 'src/auth/types/index.js';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  role: Role;

  @ApiPropertyOptional({ nullable: true })
  phoneNumber: string | null;

  @ApiPropertyOptional({ nullable: true }) bio: string | null;

  @ApiPropertyOptional({ nullable: true }) profilePicture: string | null;

  @ApiPropertyOptional({ nullable: true }) profession: string | null;

  @ApiPropertyOptional({ nullable: true }) education: string | null;

  @ApiPropertyOptional({ nullable: true }) experience: string | null;

  @ApiPropertyOptional({ nullable: true }) summary: string | null;

  @ApiProperty() skills: string[];

  @ApiPropertyOptional({ nullable: true }) industry: string | null;

  @ApiPropertyOptional({ nullable: true }) website: string | null;

  @ApiPropertyOptional({ nullable: true }) companyDescription: string | null;

  @ApiPropertyOptional({ nullable: true }) logoUrl: string | null;

  experiences?: Experience[] | null;
  projects?: Project[] | null;
  testimonials?: Testimonial [] | null;

  @ApiProperty()
  createdAt: Date;
}

export type Experience = {
  id: string;
  userId: string;
  position: string;
  companyName: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
};

export type Project = {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  technologies: string[];
};

export type Testimonial = {
  id: string;
  userId: string;
  name: string;
  company: string;
  comment: string;
};
