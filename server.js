const express = require('express');
const json = require('body-parser').json();
const EmailController = require('./controller/email-controller');
const {PORT} = require('./config')

const emailController = new EmailController()

const app = express();
app.use(json);

app.post('/send-email', emailController.postEmailReq);

app.listen(PORT, () => {
    console.log(`Email microservice listening on port ${PORT}`);
});


