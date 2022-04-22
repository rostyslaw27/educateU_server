import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationMail(to: string, link: string) {
    await this.mailerService.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      text: '',
      html: `
            <div>
                <h1>For activation click the link</h1>
                <a href="${link}">${link}</a>
            </div>
        `,
    });
  }
}
