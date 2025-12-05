import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from '../common/decorator/public.decorator.js';
import { LoginRequestDTO, RegisterRequestDTO } from './dto/auth.dto.js';

@Controller('auth')
export class Authontroller {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() body: LoginRequestDTO) {
    return this.authService.authenticate(body);
  }

  @Public()
  @Post('/register')
  async register(@Body() body: RegisterRequestDTO) {
    return this.authService.register(body);
  }

  @Public()
  @Post('/verify-otp')
  async verifyOtp(@Body() body:  RegisterRequestDTO ) {
    return this.authService.verifyOtp(body);
  }
}
