Email Microservice

This project is an email microservice that distributes load among three services using a flag-based distribution mode. The load ratio is configurable and can be set according to the desired balance of requests among the services. Additionally, the service can be run in mock mode, which is controlled by a mock flag.

Services

The email microservice utilizes three separate services to distribute load:

    Service SENDGRID: handles a portion of the email requests according to the configured load ratio. Default is 60%
    Service MAILGUN: handles a portion of the email requests according to the configured load ratio. Default is 20%
    Service POSTMARK: handles a portion of the email requests according to the configured load ratio. Default is 20%

Distribution Mode

The distribution mode for the email microservice is flag-based. This means that
incoming requests will distribute among the services if the flag is on else it will use service passed in input to send the email.

Load Ratio

The load ratio for the email microservice is configurable. This means that the balance of requests among the services can be adjusted according to the desired distribution. The load ratio is specified in a configuration file and can be updated as needed.

Mock Mode

The email microservice also has the option to run in mock mode. This mode is controlled by a mock flag. When the mock flag is set to true, the service will respond to requests with pre-defined responses, rather than actually sending emails. This can be useful for testing or development purposes.

Requirements

In order to run this microservice, the following dependencies must be installed:

    Node.js
    Express.js
    Nodemailer

How to run

    Clone the repository
    Install the dependencies by running npm install
    Update the config file with the required details
    Start the microservice by running npm start
    To run the service in mock mode, pass the mock flag as true.

Configuration

The configuration for the email microservice is stored in a config.js file. This file includes settings for the load ratio, mock mode, and other important details. Be sure to update this file with the appropriate settings before running the service.

Sample Request (in Distributed mode off)
{
    "service":"POSTMARK",
    "from":"sender email address", 
    "to":"reciver email address", 
    "subject":"subject", 
    "msg": "This is test message"
}

Sample Request (in Distributed mode on)
{
    "from":"sender email address", 
    "to":"reciver email address", 
    "subject":"subject", 
    "msg": "This is test message"
}

Sample Response
{
    "success": true,
    "message": "[mock response] Email sent successfully via POSTMARK"
}


Note

This is just an example README and the actual implementation may have more details and also depend on the actual architecture and technology used in the project.