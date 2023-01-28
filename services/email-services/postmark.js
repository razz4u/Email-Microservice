const postmarkTransport = require("nodemailer-postmark-transport");
const nodemailer = require("nodemailer");
const config = require("../../config");

const options = {
    auth: {
        api_key: config.services.POSTMARK.API_KEY
    }
}

class PostMark {
    constructor() {
        this.psMailer = !config.isMockEnabled && nodemailer.createTransport(postmarkTransport(options));
    }

    async sendMail(body) {
        const { from, to, subject, msg } = body
        const txt = msg
        const content = {
            from,
            to,
            subject,
            txt
        };
        let res;
        try {
            res = config.isMockEnabled ? { success: true, message: '[mock response] Email sent successfully via POSTMARK' }: await this.psMailer.sendMail(content);
        } catch (error) {
            console.log(error)
            res = { success: false, message: 'Failed to send Email via POSTMARK' };
        }
        return res;
    }
}

module.exports = PostMark