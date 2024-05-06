import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as ejs from "ejs";
import * as path from "path";
import { formatDate } from "src/utils/utils";

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
    });
  }

  async sendActivationCode(to: string, code: string, name: string) {
    const templatePath = path.join(
      __dirname,
      "../templates/activationCode.ejs",
    );
    const html = await ejs.renderFile(templatePath, { name, code });

    const mailOptions = {
      from: `"Men'ger" <${NODEMAILER_EMAIL}>`,
      to,
      subject: "Сіздің растау кодыңыз",
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendZoomLink(to: string, name: string, link: string, date: string) {
    const templatePath = path.join(
      __dirname,
      "../templates/zoomLink.ejs",
    );
    const html = await ejs.renderFile(templatePath, { name, link, date: formatDate(date) });

    const mailOptions = {
      from: `"Men'ger" <${NODEMAILER_EMAIL}>`,
      to,
      subject: "Қоңырауға кіру сілтемеңіз",
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
