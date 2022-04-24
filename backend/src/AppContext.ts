import { OAuth2Client } from "google-auth-library";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import GoogleAuthProvider from "./authentication/infra/google/GoogleAuthProvider";
import MongoDbSessionAssembler from "./authentication/infra/MongoDbSessionAssembler";
import MongoDbSessionRepository from "./authentication/infra/MongoDbSessionRepository";
import AuthProviderSelector from "./authentication/service/AuthProviderSelector";
import AuthService from "./authentication/service/AuthService";
import { getConfigForEnvironment } from "./config";
import Logger from "./logger/Logger";
import MongoDbPostNotificationAssembler from "./notifications/infra/MongoDbPostNotificationAssembler";
import MongoDbPostNotificationRepository from "./notifications/infra/MongoDbPostNotificationRepository";
import NotificationService from "./notifications/service/NotificationService";
import PostNotificationMessageAssembler from "./notifications/ws/PostNotificationMessageAssembler";
import ServerToClientEvents from "./notifications/ws/ServerToClientEvents";
import WebsocketNotificationIssuer from "./notifications/ws/WebsocketNotificationIssuer";
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
import CommentService from "./user/service/CommentService";
import UserAssembler from "./user/service/UserAssembler";
import UserFactory from "./user/service/UserFactory";
import UserService from "./user/service/UserService";
import PaginationFactory from "./utils/pagination/PaginationFactory";
import Paginator from "./utils/pagination/Paginator";
import CommentFactory from "./post/domain/CommentFactory";
import NotificationFactory from "./notifications/service/NotificationFactory";
import ImageResizer from "./storage/service/ImageResizer";
import ImageUrlVerificator from "./storage/service/ImageUrlVerificator";
import UserPreviewAssembler from "./user/service/UserPreviewResponseAssembler";

const express = require("express");

const config = getConfigForEnvironment();
// utils
const paginator = new Paginator();

// storage
const imageResizer = new ImageResizer();
const imageUrlVerifcator = new ImageUrlVerificator();

// information
const storageInformation = new S3StorageConfiguration();

//factory
const commentFactory = new CommentFactory();
const notificationFactory = new NotificationFactory();
const userFactory = new UserFactory();
export const paginationFactory = new PaginationFactory();

// assembler
export const userRequestAssembler = new UserRequestAssembler();
export const uploadProfilePictureRequestAssembler = new UploadProfilePictureRequestAssembler();
export const postRequestAssembler = new PostRequestAssembler();
const fileAssembler = new FileAssembler();
const postFactory = new PostFactory();
const postAssembler = new PostAssembler(imageUrlVerifcator);
const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();
const mongoDbSessionAssembler = new MongoDbSessionAssembler();
const mongoDbPostAssembler = new MongoPostAssembler();
const storageReportAssembler = new StorageReportAssembler();
const editPostFieldsAssembler = new EditPostFieldsAssembler();
const postNotificationAssembler = new MongoDbPostNotificationAssembler();
const postNotificationMessageAssembler = new PostNotificationMessageAssembler();

// repository
const postRepository = new MongoDbPostRepository(mongoDbPostAssembler, paginator);
const userRepository = new MongoDbUserRepository(mongoDbUserAssembler, paginator);
const sessionRepository = new MongoDbSessionRepository(mongoDbSessionAssembler);
export const fileRepository = new S3FileRepository(storageInformation, storageReportAssembler, imageResizer, imageUrlVerifcator);
const postNotificationRepository = new MongoDbPostNotificationRepository(postNotificationAssembler);

//provider
const googleClient = new OAuth2Client({
  clientId: `${config.google.clientId}`
});

const googleAuthProvider = new GoogleAuthProvider(
  getConfigForEnvironment().google.clientId,
  googleClient,
  userRepository,
  sessionRepository
);

const authProviderSelector = new AuthProviderSelector(googleAuthProvider);

// http server
export const app = express();

const httpServer = createServer(app);
httpServer.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});

// websockets
const io = new Server<DefaultEventsMap, ServerToClientEvents, DefaultEventsMap, unknown>(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// notifications
export const notificationIssuer = new WebsocketNotificationIssuer(io, postNotificationMessageAssembler);

// service
export const notificationService = new NotificationService(postNotificationRepository, notificationIssuer, sessionRepository);
export const userService = new UserService(userAssembler, userRepository, fileAssembler, fileRepository, new UserPreviewAssembler());
export const commentService = new CommentService(userRepository);

export const postService = new PostService(
  commentFactory,
  postFactory,
  postAssembler,
  postRepository,
  fileRepository,
  fileAssembler,
  notificationService,
  notificationFactory,
  editPostFieldsAssembler,
  sessionRepository,
  userService,
  commentService
);
export const authService = new AuthService(
  userAssembler,
  userFactory,
  userRepository,
  authProviderSelector,
  sessionRepository,
  postRepository
);

//logger
export const logger = new Logger();
