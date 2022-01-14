import { Config } from ".";

export const localConfig: Config = {
  http: {
    port: 8888
  },
  mongo: {
    address: "localhost",
    port: 27017,
    databaseName: "tankstagram"
  }
};
