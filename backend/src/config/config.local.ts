import { Config } from ".";

export const localConfig: Config = {
  http: {
    port: 8888
  },
  mongo: {
    connectionString: "mongodb://localhost:27017",
    databaseName: "onlytanks"
  },
  google: {
    clientId: "794809492112-tgqmg3qvf8c3cq5m68103sk3veg4b08j.apps.googleusercontent.com"
  }
};
