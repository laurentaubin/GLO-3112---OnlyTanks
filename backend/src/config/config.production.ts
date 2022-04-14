import { Config } from ".";

export const productionConfig: Config = {
  http: {
    port: 8080
  },
  mongo: {
    connectionString: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gerps.mongodb.net`,
    databaseName: "onlytanks"
  },
  google: {
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    redirectUrl: `${process.env.GOOGLE_REDIRECT_URL}`,
    frontendBaseUrl: `${process.env.FRONTEND_BASE_URL}`,
    googlePhotosApiUrl: "https://photoslibrary.googleapis.com/v1/mediaItems",
    authTokenUrl: "https://www.googleapis.com/oauth2/v4/token"
  }
};
