const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app"); // Import your Express app
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
