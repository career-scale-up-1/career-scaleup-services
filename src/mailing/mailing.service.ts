import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationOtp(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Verification OTP',
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
      });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  }
}
