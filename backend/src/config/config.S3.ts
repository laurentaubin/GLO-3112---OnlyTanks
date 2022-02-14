require("dotenv").config();

const s3Information = process.env;

export interface S3Config {
  AWS_BUCKET_NAME: string;
  AWS_BUCKET_REGION: string;
  AWS_ACCES_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}

export const S3Config: S3Config = {
  AWS_BUCKET_NAME: s3Information.AWS_BUCKET_NAME!,
  AWS_BUCKET_REGION: s3Information.AWS_BUCKET_REGION!,
  AWS_ACCES_KEY_ID: s3Information.AWS_ACCES_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: s3Information.AWS_SECRET_ACCESS_KEY!
};
