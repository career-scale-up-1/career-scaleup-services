import { Body, Controller, Get, Patch, Req, Request } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Role, Roles } from '../common/decorator/roles.decorator.js';
@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @Roles(Role.Seeker, Role.Recruiter, Role.Admin)
  getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }

  @Patch('profile') 
  @Roles(Role.Seeker, Role.Recruiter, Role.Admin)
  updateProfile(@Req() req, @Body() body) {
    return this.userService.updateUser(req.user.userId, body);
  }
}
