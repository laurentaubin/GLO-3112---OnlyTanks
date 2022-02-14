import PostRequestBody from "../api/PostRequestBody";
import Post from "../domain/Post";
import PostRepository from "../domain/PostRepository";
import PostFactory from "./PostFactory";
import FileAssembler from "../../storage/service/FileAssembler";
import FileRepository from "../../storage/domain/FileRepository";
import UserRepository from "../../user/domain/UserRepository";
import Pagination from "../../utils/pagination/Pagination";
import PostResponse from "../api/PostResponse";
import PostAssembler from "./PostAssembler";

export default class PostService {
  constructor(
    private postFactory: PostFactory,
    private postAssembler: PostAssembler,
    private postRepository: PostRepository,
    private fileRepository: FileRepository,
    private fileAssembler: FileAssembler,
    private userRepository: UserRepository
  ) {}

  public async addPost(postRequest: PostRequestBody) {
    const file = this.fileAssembler.assembleFile(postRequest.file);

    const storageReport = await this.fileRepository.storeImage(file);

    const post: Post = this.postFactory.create(postRequest, storageReport.imageUrl);

    this.postRepository.save(post);
  }

  public async getAuthorPosts(author: string, pagination: Pagination): Promise<PostResponse[]> {
    await this.userRepository.verifyIfUserExists(author);

    const posts = await this.postRepository.findByAuthor(author, pagination);

    return posts.map(this.postAssembler.assemblePostResponse);
  }
}
