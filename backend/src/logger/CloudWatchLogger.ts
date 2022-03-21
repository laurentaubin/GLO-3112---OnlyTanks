const winston = require("winston");
const CloudWatchTransport = require("winston-aws-cloudwatch");

interface LogInfo {
  level: string;
  message: string;
  meta: any;
}

const environment = process.env.ENVIRONMENT || "local";

const cloudwatchConfig = {
  logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
  logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${environment}`,
  createLogGroup: true,
  createLogStream: true,
  awsConfig: {
    accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
  },
  formatLog: ({ level, message, meta }: LogInfo) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(meta)}`
};

const cloudWatchLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [new CloudWatchTransport(cloudwatchConfig)]
});

module.exports = cloudWatchLogger;
