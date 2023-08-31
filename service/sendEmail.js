
const {AWS}=require('aws-sdk')
const {AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY,}=require('../config/connection')
/**
 * Sends email address
 * @param {Array} recipients
 * @param {String} subject
 * @param {String} template
 * @param {String} ccRecipients
 */
const sendEmail = (recipients, subject, template, ccRecipients) => {
  let destinationEmail = [];
  let ccDestinationEmail = [];

destinationEmail=recipients
ccDestinationEmail=ccRecipients
  return new Promise((resolve, reject) => {
    try {
      const SES_CONFIG = {
        accessKeyId: AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: AWS_SES_SECRET_ACCESS_KEY,
        region: 'ap-south-1',
      };

      const ses = new AWS.SES(SES_CONFIG);
      const params= {
        Destination: {
          ToAddresses: destinationEmail,
          CcAddresses: ccDestinationEmail || [],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: 'gurwinder.singh@simbaquartz.com',
      };
      const sendEmail = async () => await ses.sendEmail(params).promise();
      sendEmail();
      resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

export default sendEmail;