const MailGun = require('./email-services/mailgun');
const SendGrid = require('./email-services/sendgrid');
const PostMark = require('./email-services/postmark');
const { services, isDistributedMode } = require('../config')

const serviceWeightageList = [];
const serviceObj = {};

for (const key of Object.keys(services)) {
    serviceWeightageList.push({
        serviceName: key,
        PERCENTAGE: services[key].PERCENTAGE,
        ACCUM_PERCENTAGE: services[key].ACCUM_PERCENTAGE
    })
}

class EmailService {
    constructor() {
        serviceObj['SENDGRID'] = new SendGrid();
        serviceObj['MAILGUN'] = new MailGun();
        serviceObj['POSTMARK'] = new PostMark();
    }

    async sendMail(body) {
        let service
        let content

        if(isDistributedMode){
            service = this.getRouteService()
            content = body
        }else{
            ({service, ...content} = body);
        }
         let res = await serviceObj[service].sendMail(content)
         if(res && !res.success){
            res = await this.retryEmail(service,content)
         }
         return res

    }

    getRouteService() {
        // assume 0th index as default 
        let serviceWithMaxAccWeight = serviceWeightageList[0];

        // choose the service with the largest percentageAccum
        for (let i = 1; i < serviceWeightageList.length; i++) {
            if (serviceWeightageList[i].ACCUM_PERCENTAGE >= serviceWithMaxAccWeight.ACCUM_PERCENTAGE) {
                serviceWithMaxAccWeight = serviceWeightageList[i];
            }
        }

        // subtract 100 from the percentageAccum for the chosen service
        let inverseAccWeight = serviceWithMaxAccWeight.ACCUM_PERCENTAGE - 100;
        serviceWithMaxAccWeight.ACCUM_PERCENTAGE = inverseAccWeight;


        // add percentageLoad to percentageAccum for all services, including the chosen service
        for (let weightedService of serviceWeightageList) {
            let weight = weightedService.PERCENTAGE;
            let accWeight = weightedService.ACCUM_PERCENTAGE;
            weightedService.ACCUM_PERCENTAGE = weight + accWeight;
        }

        return serviceWithMaxAccWeight.serviceName;
    }

    async retryEmail(currentService, content){
        console.log(`current : ${currentService}`);
        let res
        for (const service of Object.keys(services)) {     
            if(service !== currentService){
                console.log(`cur: ${service}`);
                res =  await serviceObj[service].sendMail(content)
                if(res.message === "success" || res.success === true){
                   return res
                 }
            }
        }
        res = {success: false, message: `Failed to send Email via ${currentService}`};
        return res
    }


}

module.exports = EmailService;