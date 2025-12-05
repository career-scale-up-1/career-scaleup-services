import { Body, Req, Controller, Get, Post } from '@nestjs/common';
import { CoverLetterService } from './coverLetter.service.js';
import { GenerateCoverLetterDTO } from './dto/cover-letter.dto.js';

@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Get('')
  async getCoverLetters(@Req() req) {
    return this.coverLetterService.getCoverLetters(req.user.UserId);
  }

  @Post('generate')
  async generateCoverLetter(
    @Body() body: GenerateCoverLetterDTO,
    @Req() req,
  ) {
    return this.coverLetterService.generateCoverLetter(req.user.userId, body);
  }
}
