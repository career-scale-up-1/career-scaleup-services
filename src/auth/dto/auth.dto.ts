import { ApiProperty } from '@nestjs/swagger';
import type { Role } from '../types/index.js';
import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegisterRequestDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ enum: ['Seeker', 'Recruiter', 'Admin'] })
  @IsNotEmpty()
  role: Role;

  @ApiProperty()
  otp?: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  role: Role;
}

export class AuthResponseDTO {
  @ApiProperty()
  accesToken: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  role: Role;
}
