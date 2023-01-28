module.exports = {
    services:{
        SENDGRID:{
            API_KEY: "YOUR_API_KEY",
            PERCENTAGE: 60, 
            ACCUM_PERCENTAGE: 0 
        },
        MAILGUN:{
            API_KEY: "YOUR_API_KEY",
            DOMAIN: "YOUR_MAILGUN_DOMAIN",
            PERCENTAGE: 20, 
            ACCUM_PERCENTAGE: 0 
        },
        POSTMARK:{
            POSTMARK_API_KEY: "YOUR_API_KEY",
            PERCENTAGE: 20, 
            ACCUM_PERCENTAGE: 0 
        }
    },
    isDistributedMode: true,
    PORT:3000,
    isMockEnabled: true

};

