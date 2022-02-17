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
import User from "../../user/domain/User";

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
    const user = await this.userRepository.findByUsername(author);

    return posts.map((post) => this.postAssembler.assemblePostResponse(post, user));
  }

  public async getPosts(pagination: Pagination): Promise<Awaited<PostResponse>[]> {
    const posts = await this.postRepository.find(pagination);
    const postResponse = posts.map(async (post) => {
      const user = await this.userRepository.findByUsername(post.author);
      return this.postAssembler.assemblePostResponse(post, user as User);
    });
    return Promise.all(postResponse);
  }
}
