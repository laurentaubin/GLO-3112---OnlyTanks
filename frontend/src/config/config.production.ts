import { Config } from ".";

export const productionConfig: Config = {
  server: {
    address: "http://onlytanksbackend-env.eba-w3ecpqtz.us-east-1.elasticbeanstalk.com"
  },

  google: {
    clientId: "794809492112-oackn6ovsc6hqeqlt7a6g9u1kg1t3trh.apps.googleusercontent.com"
  },

  firebase: {
    apiKey: "AIzaSyDN2XzMAZZYak6wyBXmdhyz3wY7YbqfQOA",
    authDomain: "onlytanks.firebaseapp.com",
    projectId: "onlytanks",
    storageBucket: "onlytanks.appspot.com",
    messagingSenderId: "794809492112",
    appId: "1:794809492112:web:724194297d6d7801cbae15",
    measurementId: "G-REXLLZD83V"
  }
};
