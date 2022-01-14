import { Config } from ".";

export const dockerConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    address: "tankstagram-mongo",
    port: 27017,
    databaseName: "tankstagram"
  }
};
