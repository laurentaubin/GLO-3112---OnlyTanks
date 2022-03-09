import { Config } from ".";

export const labConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    connectionString: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.p8eew.mongodb.net`,
    databaseName: "onlytanks"
  },
  google: {
    clientId: `${process.env.GOOGLE_CLIENT_ID}`
  }
};
