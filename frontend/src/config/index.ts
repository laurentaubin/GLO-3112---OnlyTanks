import getConfig from "next/config";
import { dockerConfig } from "./config.docker";
import { localConfig } from "./config.local";

export interface Config {
  server: {
    address: string;
    port: number;
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

    default:
      throw "Unknown environement name";
  }
};
