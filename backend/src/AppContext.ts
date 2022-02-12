import AuthService from "./authentication/service/AuthService";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserService from "./user/service/UserService";
import PostAssembler from "./post/service/PostAssembler";
import MongoDbPostRepository from "./post/infra/MongoDbPostRepository";
import MongoDbPostAssembler from "./post/infra/MongoDbPostAssembler";
import StorageInformation from "./storage/infra/StorageInformation";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import LocalAuthProvider from "./authentication/infra/local/LocalAuthProvider";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import { OAuth2Client } from "google-auth-library";
import { getConfigForEnvironment } from "./config";
import MongoDbSessionAssembler from "./authentication/infra/MongoDbSessionAssembler";
import MongoDbSessionRepository from "./authentication/infra/MongoDbSessionRepository";
import S3PictureStorage from "./storage/infra/S3PictureStorage";
import PostService from "./post/service/PostService";
import PostAssemblerRequest from "./post/api/PostRequestAssembler";
import PaginationFactory from "./utils/pagination/PaginationFactory";
import Paginator from "./utils/pagination/Paginator";

// utils
const paginator = new Paginator();

// information
const storageInformation = new StorageInformation();

// assembler
export const postRequestAssembler = new PostAssemblerRequest();
const postAssembler = new PostAssembler();
const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();
const mongoDbPostAssembler = new MongoDbPostAssembler();
export const paginationFactory = new PaginationFactory();
const mongoDbSessionAssembler = new MongoDbSessionAssembler();

// repository
const postRepository = new MongoDbPostRepository(mongoDbPostAssembler, paginator);
const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);
const sessionRepository = new MongoDbSessionRepository(mongoDbSessionAssembler);

// service
export const storageService = new S3PictureStorage(storageInformation);
export const postService = new PostService(postAssembler, postRepository, storageService, userRepository);
const googleClient = new OAuth2Client({
  clientId: `${getConfigForEnvironment().google.clientId}`
});

const googleAuthProvider = new GoogleAuthProvider(
  getConfigForEnvironment().google.clientId,
  googleClient,
  userRepository,
  userAssembler,
  sessionRepository
);

const localAuthProvider = new LocalAuthProvider(userRepository, userAssembler, sessionRepository);
const authProviderSelector = new AuthProviderSelector(localAuthProvider, googleAuthProvider);

export const userService = new UserService(userAssembler, userRepository);
export const authService = new AuthService(userAssembler, userRepository, authProviderSelector, sessionRepository);
