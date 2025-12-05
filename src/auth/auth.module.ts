import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { UsersModule } from '../users/users.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Authontroller } from './auth.controller.js';
import { MailingModule } from '../mailing/mailing.module.js';
import type ms from 'ms';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    MailingModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          privateKey: configService.get<string>('JWT_PRIVATE_KEY')!.replace(/\\n/g, '\n'),
          publicKey: configService.get<string>('JWT_PUBLIC_KEY')!.replace(/\\n/g, '\n'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string>('JWT_EXPIRES_IN') as ms.StringValue | number | undefined,
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [Authontroller],
  exports: [AuthService],
})
export class AuthModule {}
