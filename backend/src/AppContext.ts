import AuthService from "./authentication/service/AuthService";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoDbUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserService from "./user/service/UserService";
import PostFactory from "./post/service/PostFactory";
import PostAssembler from "./post/service/PostAssembler";
import MongoPostAssembler from "./post/infra/MongoDbPostAssembler";
import MongoDbPostRepository from "./post/infra/MongoDbPostRepository";
import S3StorageConfiguration from "./storage/infra/S3StorageConfiguration";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import LocalAuthProvider from "./authentication/infra/local/LocalAuthProvider";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import { OAuth2Client } from "google-auth-library";
import { getConfigForEnvironment } from "./config";
import MongoDbSessionAssembler from "./authentication/infra/MongoDbSessionAssembler";
import MongoDbSessionRepository from "./authentication/infra/MongoDbSessionRepository";
import S3FileRepository from "./storage/infra/S3FileRepository";
import PostService from "./post/service/PostService";
import StorageReportAssembler from "./storage/infra/StorageReportAssembler";
import FileAssembler from "./storage/service/FileAssembler";
import UserFactory from "./user/service/UserFactory";
import UploadProfilePictureRequestAssembler from "./user/api/UploadProfilePictureRequestAssembler";
import PaginationFactory from "./utils/pagination/PaginationFactory";
import Paginator from "./utils/pagination/Paginator";
import PostRequestAssembler from "./post/api/PostRequestAssembler";

// utils
const paginator = new Paginator();

// information
const storageInformation = new S3StorageConfiguration();

//factory
const userFactory = new UserFactory();
export const paginationFactory = new PaginationFactory();
// assembler
export const uploadProfilePictureRequestAssembler = new UploadProfilePictureRequestAssembler();
export const postRequestAssembler = new PostRequestAssembler();
const fileAssembler = new FileAssembler();
const postFactory = new PostFactory();
const postAssembler = new PostAssembler();
const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();
const mongoDbSessionAssembler = new MongoDbSessionAssembler();
const mongoDbPostAssembler = new MongoPostAssembler();
const storageReportAssembler = new StorageReportAssembler();

// repository
const postRepository = new MongoDbPostRepository(mongoDbPostAssembler, paginator);
const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);
const sessionRepository = new MongoDbSessionRepository(mongoDbSessionAssembler);
export const fileRepository = new S3FileRepository(storageInformation, storageReportAssembler);

//provider
const googleClient = new OAuth2Client({
  clientId: `${getConfigForEnvironment().google.clientId}`
});

const googleAuthProvider = new GoogleAuthProvider(
  getConfigForEnvironment().google.clientId,
  googleClient,
  userRepository,
  sessionRepository
);

const localAuthProvider = new LocalAuthProvider(userRepository, userAssembler, sessionRepository);
const authProviderSelector = new AuthProviderSelector(localAuthProvider, googleAuthProvider);

// service
export const postService = new PostService(postFactory, postAssembler, postRepository, fileRepository, fileAssembler, userRepository);
export const userService = new UserService(userAssembler, userRepository, fileAssembler, fileRepository);
export const authService = new AuthService(userAssembler, userFactory, userRepository, authProviderSelector, sessionRepository);
