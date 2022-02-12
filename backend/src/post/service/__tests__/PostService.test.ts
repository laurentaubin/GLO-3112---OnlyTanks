import PostService from "../PostService";
import PostAssembler from "../PostAssembler";
import { mock, instance, when, verify } from "ts-mockito";
import PostRepository from "src/post/domain/PostRepository";
import PictureStorage from "src/storage/domain/PictureStorage";
import { FileRequest } from "src/storage/domain/FileRequest";
import StorageResponse from "src/storage/domain/S3StorageResponse";
import Post from "src/post/domain/Post";
import PostBody from "src/post/api/PostBody";
import Pagination from "src/utils/pagination/Pagination";
import UserRepository from "src/user/domain/UserRepository";

describe("PostService", () => {
  const hashTag: string[] = [];

  const anAuthor = "AN_AUTHOR";

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

  const postRequest: PostBody = {
    caption: "anCaption",
    hashtags: hashTag,
    author: "anUsername",
    file: fileRequest
  };

  const storageResponse: StorageResponse = {
    Location: "Location",
    ETag: "ETAG",
    Bucket: "bucket",
    Key: "Key"
  };

  const post: Post = {
    hashtags: hashTag,
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "id",
    createdAt: 45367432
  };

  const anotherPost: Post = {
    hashtags: hashTag,
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "ididid",
    createdAt: 534632567
  };

  const posts: Post[] = [post, anotherPost];

  const mockPostAssembler: PostAssembler = mock<PostAssembler>();
  const postAssembler = instance(mockPostAssembler);

  const mockPostRepository: PostRepository = mock<PostRepository>();
  const postRepository = instance(mockPostRepository);

  const mockPicturageStorage: PictureStorage = mock<PictureStorage>();
  const pictureStorage = instance(mockPicturageStorage);

  const mockUserRepository: UserRepository = mock<UserRepository>();
  const userRepository = instance(mockUserRepository);

  const postService = new PostService(postAssembler, postRepository, pictureStorage, userRepository);

  describe("when add post", () => {
    beforeEach(async () => {
      when(mockPicturageStorage.store(fileRequest)).thenReturn(Promise.resolve(storageResponse));
      when(mockPostAssembler.assemblePost(postRequest, storageResponse)).thenReturn(post);
      await postService.addPost(postRequest);
    });

    describe("given a postRequest", () => {
      it("should call the picture storage to store picture", () => {
        verify(mockPicturageStorage.store(fileRequest)).called();
      });

      it("should call the post assembler to get Post domain objet", () => {
        verify(mockPostAssembler.assemblePost(postRequest, storageResponse)).called();
      });

      it("should call the post Repository to save the post", () => {
        verify(mockPostRepository.save(post)).called();
      });
    });
  });

  describe("get author posts", () => {
    beforeEach(async () => {
      when(mockPostRepository.findByAuthor(anAuthor, pagination)).thenReturn(Promise.resolve(posts));
      await postService.getAuthorPosts(anAuthor, pagination);
    });

    describe("given a author and a pagination", () => {
      it("should call the post repositoty to get the posts with the right argument", () => {
        verify(mockPostRepository.findByAuthor(anAuthor, pagination)).called();
      });
    });
  });
});
