import AuthService from "./authentication/service/AuthService";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserService from "./user/service/UserService";
import PostAssembler from "./post/service/PostAssembler";
import MongoPostRepository from "./post/infra/MongoDbPostRepository";
import MongoPostAssembler from "./post/infra/MongoDbPostAssembler";
import StorageInformation from "./storage/infra/StorageInformation";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import LocalAuthProvider from "./authentication/infra/local/LocalAuthProvider";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import { OAuth2Client } from "google-auth-library";
import { getConfigForEnvironment } from "./config";
import S3PictureStorage from "./storage/infra/S3PictureStorage";
import PostService from "./post/service/PostService";
import PostAssemblerRequest from "./post/api/PostAssemblerRequest";

// information
const storageInformation = new StorageInformation();

// assembler
export const postAssemblerRequest = new PostAssemblerRequest();
const postAssembler = new PostAssembler();
const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();
const mongoPostAssembler = new MongoPostAssembler();

// repository
const postRepository = new MongoPostRepository(mongoPostAssembler);
const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);

// service
export const storageService = new S3PictureStorage(storageInformation);
export const postService = new PostService(postAssembler, postRepository, storageService);
const googleClient = new OAuth2Client({
  clientId: `${getConfigForEnvironment().google.clientId}`
});
const googleAuthProvider = new GoogleAuthProvider(getConfigForEnvironment().google.clientId, googleClient, userRepository, userAssembler);
const localAuthProvider = new LocalAuthProvider(userRepository, userAssembler);
const authProviderSelector = new AuthProviderSelector(localAuthProvider, googleAuthProvider);

export const userService = new UserService(userAssembler, userRepository);
export const authService = new AuthService(userAssembler, userRepository, authProviderSelector);
