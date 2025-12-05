export type Role = 'Seeker' | 'Recruiter' | 'Admin';

export interface JwtPayload {
  sub: number;
  fullName: string;
  role: Role;
  iat: number;
  exp: number;
}
