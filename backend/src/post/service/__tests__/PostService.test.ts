import PostService from "../PostService";
import PostAssembler from "../PostAssembler";
import { mock, instance, when, verify } from "ts-mockito";
import PostRepository from "src/post/domain/PostRepository";
import PictureStorage from "src/storage/domain/PictureStorage";
import { FileRequest } from "src/storage/domain/FileRequest";
import StorageResponse from "src/storage/domain/S3StorageResponse";
import Post from "src/post/domain/Post";
import PostBody from "src/post/api/PostBody";

describe("PostService", () => {
  const hashTag: string[] = [];

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
    id: "id"
  };

  const mockPostAssembler: PostAssembler = mock<PostAssembler>();
  const postAssembler = instance(mockPostAssembler);

  const mockPostRepository: PostRepository = mock<PostRepository>();
  const postRepository = instance(mockPostRepository);

  const mockPicturageStorage: PictureStorage = mock<PictureStorage>();
  const pictureStorage = instance(mockPicturageStorage);

  const postService = new PostService(postAssembler, postRepository, pictureStorage);

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
});
