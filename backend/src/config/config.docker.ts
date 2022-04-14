import { Config } from ".";

export const dockerConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    connectionString: "mongodb://onlytanks-mongo:27017",
    databaseName: "onlytanks"
  },
  google: {
    clientId: "794809492112-tgqmg3qvf8c3cq5m68103sk3veg4b08j.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUrl: "http://localhost:8888/handle-google-redirect",
    frontendBaseUrl: "http://localhost:3000",
    googlePhotosApiUrl: "https://photoslibrary.googleapis.com/v1/mediaItems",
    authTokenUrl: "https://www.googleapis.com/oauth2/v4/token"
  }
};
