import awsServerlessExpress from "aws-serverless-express";
import app from "./app.js"; // Import your Express app
const server = awsServerlessExpress.createServer(app);

export const handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return await awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
