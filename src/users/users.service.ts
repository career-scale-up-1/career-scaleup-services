import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from './dto/user.dto.js';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Partial<UserDTO> | null> {
    return await this.prismaService.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phoneNumber: true,
        bio: true,
        profilePicture: true,
        profession: true,
        education: true,
        experience: true,
        summary: true,
        skills: true,
        industry: true,
        website: true,
        companyDescription: true,
        logoUrl: true,
        recruiterJobs: {
          include: {
            applications: true,
          },
        },
        seekerApplications: true,

        experiences: true,
        projects: true,
        testimonials: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    return await this.prismaService.users.findUnique({ where: { email } });
  }

  async createUser(user: UserDTO): Promise<UserDTO> {
    const { experiences, projects, testimonials, ...userData } = user;

    return await this.prismaService.users.create({
      data: {
        ...userData,

        experiences: experiences
          ? {
              create: experiences.map((exp) => ({
                companyName: exp.companyName,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate || undefined,
                description: exp.description,
                achievements: [],
                technologies: [],
              })),
            }
          : undefined,

        projects: projects
          ? {
              create: projects.map((proj) => ({
                projectName: proj.projectName,
                description: proj.description,
                technologies: proj.technologies || [],
              })),
            }
          : undefined,

        testimonials: testimonials
          ? {
              create: testimonials.map((t) => ({
                name: t.name,
                company: t.company,
                comment: t.comment,
              })),
            }
          : undefined,
      },
      include: {
        experiences: true,
        projects: true,
        testimonials: true,
      },
    });
  }

  async updateUser(id: string, updatedUserData: Partial<User>) {
    const { experiences, projects, testimonials, ...userData } =
      updatedUserData;
    return await this.prismaService.users.update({
      where: { id },
      data: {
        ...userData,
        experiences: experiences
          ? {
              deleteMany: {},
              create: experiences.map((exp) => ({
                companyName: exp.companyName,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate || undefined,
                description: exp.description,
                achievements: [],
                technologies: [],
              })),
            }
          : undefined,
        projects: projects
          ? {
              deleteMany: {},
              create: projects.map((proj) => ({
                projectName: proj.projectName,
                description: proj.description,
                technologies: proj.technologies || [],
              })),
            }
          : undefined,
        testimonials: testimonials
          ? {
              deleteMany: {},
              create: testimonials.map((t) => ({
                name: t.name,
                company: t.company,
                comment: t.comment,
              })),
            }
          : undefined,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phoneNumber: true,
        bio: true,
        profilePicture: true,
        profession: true,
        education: true,
        experience: true,

        experiences: true,
        projects: true,
        testimonials: true,

        summary: true,
        skills: true,
        industry: true,
        website: true,
        companyDescription: true,
        logoUrl: true,
      },
    });
  }
}
