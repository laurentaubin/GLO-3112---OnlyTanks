import { Config } from ".";

export const localConfig: Config = {
  http: {
    port: 8888
  },
  mongo: {
    connectionString: "mongodb://localhost:27017",
    databaseName: "tankstagram"
  }
};
