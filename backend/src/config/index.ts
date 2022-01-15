import { dockerConfig } from "./config.docker";
import { localConfig } from "./config.local";

export interface Config {
  http: {
    port: number;
  };

  mongo: {
    address: string;
    databaseName: string;
    port: number;
  };
}

export const getConfigForEnvironment = () => {
  const environment = process.env.ENVIRONMENT || "local";

  switch (environment) {
    case "local":
      return localConfig;

    case "docker":
      return dockerConfig;

    default:
      throw "Unknown environement name";
  }
};
