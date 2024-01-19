import AWS from "aws-sdk";
import dotenv from 'dotenv';

dotenv.config();
const AWS_SES_ACCESS_KEY_ID = process.env.AWS_SES_ACCESS_KEY_ID;
const AWS_SES_SECRET_ACCESS_KEY = process.env.AWS_SES_SECRET_ACCESS_KEY;
/**
 * Sends an email
 * @param {Array} recipients - An array of recipient email addresses
 * @param {String} subject - The email subject
 * @param {String} template - The HTML email content
 * @param {Array} ccRecipients - An array of CC recipient email addresses (optional)
 */
const sendEmail = (recipients, subject, template, ccRecipients = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ses = new AWS.SES({
        accessKeyId: AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: AWS_SES_SECRET_ACCESS_KEY,
        region: 'ap-south-1'
      });
      const params = {
        Destination: {
          ToAddresses: recipients,
          CcAddresses: ccRecipients
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: 'gurwinder.singh@simbaquartz.com'
      };
      await ses.sendEmail(params).promise();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export  {
  sendEmail
};