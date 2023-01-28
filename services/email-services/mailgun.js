const mailgun = require("mailgun-js");
const nodemailer = require("nodemailer");
const config = require("../../config");

// Configure your Mailgun API key
const mg = mailgun({ apiKey: config.services.MAILGUN.API_KEY, domain: config.services.MAILGUN.DOMAIN });

const options = {
    service: "Mailgun",
    auth: {
        api_key: config.services.MAILGUN.API_KEY
    }
}

class MailGun {
    constructor() {
        this.mgMailer = !config.isMockEnabled && nodemailer.createTransport(options);
    }

    async sendMail(body) {
        const { from, to, subject, msg } = body
        const text = msg
        const content = {
            from,
            to,
            subject,
            text
        };

        let res;
        try {
            res = config.isMockEnabled ? { success: true, message: '[mock response] Email sent successfully via MAILGUN' }: await this.mgMailer.sendMail(content) ;
        } catch (error) {
            console.log(error)
            res = { success: false, message: 'Failed to send Email via MAILGUN' };
        }
        return res;
    }
}

module.exports = MailGun