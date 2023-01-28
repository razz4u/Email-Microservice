const EmailService = require('../services/email-service')

class EmailController {
    constructor() {
        this.emailService = new EmailService()
    }

    postEmailReq = async (req, res) => {
        const response = await this.emailService.sendMail(req.body)
        return res.send(response);
    }
}

module.exports = EmailController;
