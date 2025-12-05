import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthService } from './auth/auth.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard.js';
import { RolesGuard } from './common/guards/roles.guard.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { MailingModule } from './mailing/mailing.module.js';
import { MailingService } from './mailing/mailing.service.js';
import { ResumeModule } from './resume/resume.module.js';
import { JobModule } from './job/job.module.js';
import { AiInterviewModule } from './ai-interview/ai-interview.module.js';
import { CoverLetterModule } from './cover-letter/coverLetter.module.js';
import { ApplicationsModule } from './application/applications.module.js';
import { MessagingModule } from './messaging/messaging.module.js';
import type ms from 'ms';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          privateKey: configService
            .get<string>('JWT_PRIVATE_KEY')!
            .replace(/\\n/g, '\n'),
          publicKey: configService
            .get<string>('JWT_PUBLIC_KEY')!
            .replace(/\\n/g, '\n'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string>('JWT_EXPIRES_IN') as ms.StringValue | number | undefined,
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    PassportModule,
    PrismaModule,
    MailingModule,
    ResumeModule,
    JobModule,
    AiInterviewModule,
    CoverLetterModule,
    ApplicationsModule,
    MessagingModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    MailingService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
