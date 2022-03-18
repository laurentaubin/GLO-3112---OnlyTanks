import { OAuth2Client } from "google-auth-library";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import MongoDbSessionAssembler from "./authentication/infra/MongoDbSessionAssembler";
import MongoDbSessionRepository from "./authentication/infra/MongoDbSessionRepository";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import AuthService from "./authentication/service/AuthService";
import { getConfigForEnvironment } from "./config";
import MongoDbPostNotificationAssembler from "./notifications/infra/MongoDbPostNotificationAssembler";
import MongoDbPostNotificationRepository from "./notifications/infra/MongoDbPostNotificationRepository";
import NotificationService from "./notifications/service/NotificationService";
import PostRequestAssembler from "./post/api/PostRequestAssembler";
import MongoPostAssembler from "./post/infra/MongoDbPostAssembler";
import MongoDbPostRepository from "./post/infra/MongoDbPostRepository";
import EditPostFieldsAssembler from "./post/service/EditPostFieldsAssembler";
import PostAssembler from "./post/service/PostAssembler";
import PostFactory from "./post/service/PostFactory";
import PostService from "./post/service/PostService";
import S3FileRepository from "./storage/infra/S3FileRepository";
import S3StorageConfiguration from "./storage/infra/S3StorageConfiguration";
import StorageReportAssembler from "./storage/infra/StorageReportAssembler";
import FileAssembler from "./storage/service/FileAssembler";
import UploadProfilePictureRequestAssembler from "./user/api/UploadProfilePictureRequestAssembler";
import UserRequestAssembler from "./user/api/UserRequestAssembler";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoDbUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserFactory from "./user/service/UserFactory";
import UserService from "./user/service/UserService";
import PaginationFactory from "./utils/pagination/PaginationFactory";
import Paginator from "./utils/pagination/Paginator";

// utils
const paginator = new Paginator();

// information
const storageInformation = new S3StorageConfiguration();

//factory
const userFactory = new UserFactory();
export const paginationFactory = new PaginationFactory();
// assembler
export const userRequestAssembler = new UserRequestAssembler();
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
const editPostFieldsAssembler = new EditPostFieldsAssembler();
const postNotificationAssembler = new MongoDbPostNotificationAssembler();

// repository
const postRepository = new MongoDbPostRepository(mongoDbPostAssembler, paginator);
const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);
const sessionRepository = new MongoDbSessionRepository(mongoDbSessionAssembler);
export const fileRepository = new S3FileRepository(storageInformation, storageReportAssembler);
const postNotificationRepository = new MongoDbPostNotificationRepository(postNotificationAssembler);

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

const authProviderSelector = new AuthProviderSelector(googleAuthProvider);
const notificationService = new NotificationService(postNotificationRepository);

// service

export const userService = new UserService(userAssembler, userRepository, fileAssembler, fileRepository);
export const postService = new PostService(
  postFactory,
  postAssembler,
  postRepository,
  fileRepository,
  fileAssembler,
  notificationService,
  userRepository,
  editPostFieldsAssembler,
  sessionRepository,
  userService
);
export const authService = new AuthService(
  userAssembler,
  userFactory,
  userRepository,
  authProviderSelector,
  sessionRepository,
  postRepository
);
