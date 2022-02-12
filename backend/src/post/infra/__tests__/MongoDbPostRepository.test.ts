import MongoDbPostRepository from "../MongoDbPostRepository";
import { mock, instance, when, verify } from "ts-mockito";
import MongoDbPostAssembler from "../MongoDbPostAssembler";
import Post from "../../domain/Post";
import Paginator from "src/utils/pagination/Paginator";

describe("MongoDbPostRepository", () => {
  const mockMongoPostAssembler: MongoDbPostAssembler = mock<MongoDbPostAssembler>();
  const mongoPostAssembler: MongoDbPostAssembler = instance(mockMongoPostAssembler);

  const mockPaginator: Paginator = mock<Paginator>();
  const paginator: Paginator = instance(mockPaginator);

  const mongoPostRepository: MongoDbPostRepository = new MongoDbPostRepository(mongoPostAssembler, paginator);

  const postModel = {
    save: jest.fn()
  } as any;

  const post: Post = {
    hashtags: [],
    caption: "caption",
    author: "username",
    imageUrl: "url",
    id: "id",
    createdAt: 3214567546523456
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
