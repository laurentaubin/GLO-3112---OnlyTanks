import { Config } from ".";

export const productionConfig: Config = {
  server: {
    address: "http://onlytanksbackend-env.eba-w3ecpqtz.us-east-1.elasticbeanstalk.com"
  },

  google: {
    enabled: false,
    clientId: `${process.env.GOOGLE_CLIENT_ID}`
  }
};
