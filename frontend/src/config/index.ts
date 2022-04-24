import getConfig from "next/config";
import { dockerConfig } from "./config.docker";
import { labConfig } from "./config.lab";
import { localConfig } from "./config.local";
import { productionConfig } from "./config.production";

export interface Config {
  server: {
    address: string;
    port?: number;
  };

  google: {
    clientId: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
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

    case "lab":
      return labConfig;

    case "production":
      return productionConfig;

    default:
      throw "Unknown environment name";
  }
};
