import { dockerConfig } from "./config.docker";
import { localConfig } from "./config.local";

export interface Config {
  server: {
    address: string;
    port: number;
  };
}

export const getConfigForEnvironment = () => {
  console.log(process.env);
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "local";

  switch (environment) {
    case "local":
      return localConfig;

    case "docker":
      return dockerConfig;

    default:
      throw "Unknown environement name";
  }
};
