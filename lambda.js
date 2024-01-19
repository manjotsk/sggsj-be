import awsServerlessExpress from "aws-serverless-express"
import app from "./app" // Import your Express app
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
