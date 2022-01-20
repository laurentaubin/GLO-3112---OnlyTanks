import { Config } from ".";

export const dockerConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    connectionString: "mongodb://onlytanks-mongo:27017",
    databaseName: "onlytanks"
  }
};
