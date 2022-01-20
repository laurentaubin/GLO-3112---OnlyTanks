import { Config } from ".";

export const productionConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    connectionString: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gerps.mongodb.net`,
    databaseName: "onlytanks"
  }
};
