import { dockerConfig } from "./config.docker";
import { labConfig } from "./config.lab";
import { localConfig } from "./config.local";
import { productionConfig } from "./config.production";
import { S3Config } from "./config.S3";

export interface Config {
  http: {
    port: number;
  };

  mongo: {
    connectionString: string;
    databaseName: string;
  };

  google: {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
    frontendBaseUrl: string;
    googlePhotosApiUrl: string;
    authTokenUrl: string;
  };
}

export const getConfigForEnvironment = () => {
  const environment = process.env.ENVIRONMENT || "local";

  switch (environment) {
    case "local":
      return localConfig;

    case "docker":
      return dockerConfig;

    case "lab":
      return labConfig;

    case "production":
      return productionConfig;

    default:
      throw "Unknown environement name";
  }
};

export const getS3Config = () => {
  return S3Config;
};
