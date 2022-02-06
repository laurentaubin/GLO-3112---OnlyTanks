import MongoPostRepository from "../MongoDbPostRepository";
import { mock, instance, when, verify } from "ts-mockito";
import MongoPostAssembler from "../MongoDbPostAssembler";
import Post from "src/post/domain/Post";

describe("MongoDbPostRepository", () => {
  const mockMongoPostAssembler: MongoPostAssembler = mock<MongoPostAssembler>();
  const mongoPostAssembler: MongoPostAssembler = instance(mockMongoPostAssembler);

  const mongoPostRepository: MongoPostRepository = new MongoPostRepository(mongoPostAssembler);

  const postModel = {
    save: jest.fn()
  } as any;

  const post: Post = {
    hashtags: [],
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "id"
  };

  describe("save", () => {
    beforeEach(() => {
      when(mockMongoPostAssembler.assemblePostModel(post)).thenReturn(postModel);
      mongoPostRepository.save(post);
    });

    it("shoud call the mongoPostAssembler to assembler to postModel", () => {
      verify(mockMongoPostAssembler.assemblePostModel(post)).called();
    });
  });
});
