import getConfig from "next/config";
import { dockerConfig } from "./config.docker";
import { localConfig } from "./config.local";
import { productionConfig } from "./config.production";

export interface Config {
  server: {
    address: string;
    port?: number;
  };
}

export const getConfigForEnvironment = () => {
  const { publicRuntimeConfig } = getConfig();
  const environment = publicRuntimeConfig?.environment || "local";

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
