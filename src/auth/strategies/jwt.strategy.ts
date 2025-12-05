import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/index.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService
        .get<string>('JWT_PUBLIC_KEY')!
        .replace(/\\n/g, '\n')!,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      fullName: payload.fullName,
      role: payload.role,
    };
  }
}
