import PostService from "../PostService";
import PostFactory from "../PostFactory";
import { mock, instance, when, verify } from "ts-mockito";
import FileAssembler from "../../../storage/service/FileAssembler";
import File from "../../../storage/domain/File";
import StorageReport from "../../../storage/domain/StorageReport";
import Post from "../../domain/Post";
import PostRepository from "../../domain/PostRepository";
import FileRepository from "../../../storage/domain/FileRepository";
import FileRequest from "../../../storage/types/FileRequest";
import PostRequestBody from "../../api/PostRequestBody";
import Pagination from "../../../utils/pagination/Pagination";
import PostAssembler from "../PostAssembler";
import EditPostFieldsAssembler from "../EditPostFieldsAssembler";
import SessionRepository from "../../../authentication/domain/SessionRepository";
import UserPreviewService from "../../../user/service/UserPreviewService";
import NotificationService from "src/notifications/service/NotificationService";
import CommentFactory from "../../domain/CommentFactory";
import CommentService from "../../../user/service/CommentService";
import NotificationFactory from "src/notifications/service/NotificationFactory";

describe("PostService", () => {
  const hashTag: string[] = [];

  const aToken = "A_TOKEN";
  const anAuthor = "AN_AUTHOR";
  const aPostId = "A_POST_ID";

  const pagination: Pagination = {
    limit: 10,
    skip: 20
  };

  const fileRequest: FileRequest = {
    encoding: "encoding",
    destination: "destination",
    path: "path",
    filename: "filename",
    fieldname: "fieldNmae",
    originalname: "orignalName",
    size: 234567,
    mimetype: "minetype"
  };

  const file: File = {
    encoding: "encoding",
    destination: "destination",
    path: "path",
    fileName: "filename",
    fieldName: "fieldNmae",
    originalName: "orignalName",
    size: 234567,
    mimeType: "minetype"
  };

  const postRequest: PostRequestBody = {
    caption: "anCaption",
    hashtags: hashTag,
    author: "anUsername",
    userTags: [],
    file: fileRequest
  };

  const storageReport: StorageReport = {
    imageUrl: "123.com"
  };

  const post: Post = {
    hashtags: hashTag,
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "id",
    userTags: [],
    createdAt: 45367432,
    likes: [],
    comments: []
  };

  const anotherPost: Post = {
    hashtags: hashTag,
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "ididid",
    userTags: [],
    createdAt: 534632567,
    likes: [],
    comments: []
  };

  const posts: Post[] = [post, anotherPost];

  const mockNotificationFactory: NotificationFactory = mock<NotificationFactory>();
  const notificatioFactory = instance(mockNotificationFactory);

  const mockCommentFactory: CommentFactory = mock<CommentFactory>();
  const commentFactory = instance(mockCommentFactory);

  const mockPostFactory: PostFactory = mock<PostFactory>();
  const postFactory = instance(mockPostFactory);

  const mockPostAssembler: PostAssembler = mock<PostAssembler>();
  const postAssembler = instance(mockPostAssembler);

  const mockPostRepository: PostRepository = mock<PostRepository>();
  const postRepository = instance(mockPostRepository);

  const mockFileRepository: FileRepository = mock<FileRepository>();
  const fileRepository = instance(mockFileRepository);

  const mockFileAssembler: FileAssembler = mock<FileAssembler>();
  const fileAssembler = instance(mockFileAssembler);

  const mockEditPostFieldsAssembler: EditPostFieldsAssembler = mock<EditPostFieldsAssembler>();
  const editPostFieldsAssembler = instance(mockEditPostFieldsAssembler);

  const mockSessionRepository: SessionRepository = mock<SessionRepository>();
  const sessionRepository = instance(mockSessionRepository);

  const mockUserPreviewService: UserPreviewService = mock<UserPreviewService>();
  const userPreviewService = instance(mockUserPreviewService);

  const mockNotificationService: NotificationService = mock<NotificationService>();
  const notificationService = instance(mockNotificationService);

  const mockCommentService: CommentService = mock<CommentService>();
  const commentService = instance(mockCommentService);

  const postService = new PostService(
    commentFactory,
    postFactory,
    postAssembler,
    postRepository,
    fileRepository,
    fileAssembler,
    notificationService,
    notificatioFactory,
    editPostFieldsAssembler,
    sessionRepository,
    userPreviewService,
    commentService
  );

  describe("when add post", () => {
    beforeEach(async () => {
      when(mockFileAssembler.assembleFile(fileRequest)).thenReturn(file);
      when(mockFileRepository.storeImage(file, false, true)).thenReturn(Promise.resolve(storageReport));
      when(mockPostFactory.create(postRequest, storageReport.imageUrl)).thenReturn(post);
      await postService.addPost(postRequest);
    });

    describe("given a postRequest", () => {
      it("should call the picture storage to store picture", () => {
        verify(mockFileRepository.storeImage(file, false, true)).called();
      });

      it("should call the post assembler to get Post types objet", () => {
        verify(mockPostFactory.create(postRequest, storageReport.imageUrl)).called();
      });

      it("should call the post Repository to save the post", () => {
        verify(mockPostRepository.save(post)).called();
      });
    });
  });

  describe("get author posts", () => {
    beforeEach(async () => {
      when(mockPostRepository.findByAuthor(anAuthor, pagination)).thenReturn(Promise.resolve(posts));
      await postService.getAuthorPosts(aToken, anAuthor, pagination);
    });

    describe("given a author and a pagination", () => {
      it("should call the post repository to get the posts with the right argument", () => {
        verify(mockPostRepository.findByAuthor(anAuthor, pagination)).called();
      });
    });
  });

  describe("delete post", () => {
    beforeEach(async () => {
      postService.deletePost(aPostId);
    });

    it("should call the repository to delete the post", () => {
      verify(mockPostRepository.delete(aPostId)).called();
    });
  });
});
