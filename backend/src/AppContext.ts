import AuthService from "./authentication/service/AuthService";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserService from "./user/service/UserService";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import LocalAuthProvider from "./authentication/infra/local/LocalAuthProvider";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import { OAuth2Client } from "google-auth-library";
import { getConfigForEnvironment } from "./config";

const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();

const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);

const googleClient = new OAuth2Client({
  clientId: `${getConfigForEnvironment().google.clientId}`
});
const googleAuthProvider = new GoogleAuthProvider(getConfigForEnvironment().google.clientId, googleClient, userRepository, userAssembler);
const localAuthProvider = new LocalAuthProvider(userRepository, userAssembler);
const authProviderSelector = new AuthProviderSelector(localAuthProvider, googleAuthProvider);

export const userService = new UserService(userAssembler, userRepository);
export const authService = new AuthService(userAssembler, userRepository, authProviderSelector);
