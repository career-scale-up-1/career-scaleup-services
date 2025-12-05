import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import {
  LoginRequestDTO,
  AuthResponseDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
} from './dto/auth.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailingService } from '../mailing/mailing.service.js';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private mailingService: MailingService,
    private configService: ConfigService,
  ) {}

  async authenticate(input: LoginRequestDTO): Promise<AuthResponseDTO> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.login(user);
  }

  async validateUser(input: LoginRequestDTO): Promise<LoginResponseDTO | null> {
    const user = await this.prismaService.users.findUnique({
      where: { email: input.email },
    });

    if (user && (await bcrypt.compare(input.password, user.password))) {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };
    }

    return null;
  }

  async login(user: LoginResponseDTO): Promise<AuthResponseDTO> {
    const payload = {
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
    const accesToken = await this.jwtService.signAsync(payload);
    return {
      accesToken,
      userId: user.id.toString(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async register(user: RegisterRequestDTO): Promise<object> {
    const existingUser = await this.prismaService.users.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const otp = await this.generateOtp();

    await this.mailingService.sendVerificationOtp(user.email, otp);
    await this.prismaService.otp.create({
      data: {
        email: user.email,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const otpToken = jwt.sign(
      { email: user.email },
      this.configService.get<string>('JWT_SECRET')!,
      {
        expiresIn: '5m',
      },
    );

    return {
      message: 'OTP sent to email',
      otpToken: otpToken,
      statusCode: 200,
    };
  }

  async generateOtp(): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  async verifyOtp(user: RegisterRequestDTO): Promise<AuthResponseDTO> {
    const otpRecord = await this.prismaService.otp.findFirst({
      where: {
        email: user.email,
        code: user.otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    await this.prismaService.otp.deleteMany({
      where: { email: user.email },
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersService.createUser({
      id: randomUUID(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      password: hashedPassword,
      createdAt: new Date(),
    });
    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accesToken: accessToken,
      userId: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    };
  }
}
