import { SetMetadata } from '@nestjs/common';

export enum Role {
  Seeker = 'Seeker',
  Recruiter = 'Recruiter',
  Admin = 'Admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...role: string[]) => SetMetadata(ROLES_KEY, role);
