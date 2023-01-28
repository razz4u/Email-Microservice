const sgTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const config = require("../../config");

const options = {
  auth: {
    api_key: config.services.SENDGRID.API_KEY
  }
}

class SendGrid {
  constructor() {
    this.sgMailer = !config.isMockEnabled && nodemailer.createTransport(sgTransport(options));
  }

  async sendMail(body) {
    const { from, to, subject, msg } = body
    const html = msg
    const content = {
      from,
      to,
      subject,
      html
    };

    let res;
    try {
      res = config.isMockEnabled ? { success: true, message: '[mock response] Email sent successfully via SENDGRID' }: await this.sgMailer.sendMail(content) ;
    } catch (error) {
      console.log(error)
      res = {success: false, message: 'Failed to send Email via SENDGRID'};
    }
   return res;
  }
}

module.exports = SendGrid