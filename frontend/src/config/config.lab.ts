import { Config } from ".";

export const labConfig: Config = {
  server: {
    address: "http://onlytanksbackendlab-env.eba-8qv4up2m.us-east-1.elasticbeanstalk.com"
  },

  google: {
    enabled: true,
    clientId: `${process.env.GOOGLE_CLIENT_ID}`
  }
};
