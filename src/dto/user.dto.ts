import { Experience, Project, Testimonial } from '../users/dto/user.dto.js';
import { Role } from '../auth/types/index.js';

export type UserDTO = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: Role;
  phoneNumber?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  education?: string | null;
  experience?: string | null;
  summary?: string | null;
  skills?: string[];
  industry?: string | null;
  companyName?: string | null;
  website?: string | null;
  companyDescription?: string | null;
  logoUrl?: string | null;

  experiences?: Experience[] | null;
  projects?: Project[] | null;
  testimonials?: Testimonial[] | null;

  createdAt: Date;
};
