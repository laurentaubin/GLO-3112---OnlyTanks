import { dockerConfig } from "./config.docker";
import { localConfig } from "./config.local";
import { productionConfig } from "./config.production";

export interface Config {
  http: {
    port: number;
  };

  mongo: {
    connectionString: string;
    databaseName: string;
  };
}

export const getConfigForEnvironment = () => {
  const environment = process.env.ENVIRONMENT || "local";

  switch (environment) {
    case "local":
      return localConfig;

    case "docker":
      return dockerConfig;

    case "production":
      return productionConfig;

    default:
      throw "Unknown environement name";
  }
};
