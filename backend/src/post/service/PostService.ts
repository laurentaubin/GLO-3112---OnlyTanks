import PictureStorage from "src/storage/domain/PictureStorage";
import Pagination from "src/utils/pagination/Pagination";
import PostBody from "../api/PostBody";
import Post from "../domain/Post";
import PostRepository from "../domain/PostRepository";
import PostAssembler from "./PostAssembler";
import PostResponse from "../api/PostResponse";
import UserRepository from "src/user/domain/UserRepository";

export default class PostService {
  constructor(
    private postAssembler: PostAssembler,
    private postRepository: PostRepository,
    private pictureStorage: PictureStorage,
    private userRepository: UserRepository
  ) {}

  public async addPost(postRequest: PostBody) {
    const storageResponse = await this.pictureStorage.store(postRequest.file);

    const post: Post = this.postAssembler.assemblePost(postRequest, storageResponse);

    this.postRepository.save(post);
  }

  public async getAuthorPosts(author: string, pagination: Pagination): Promise<PostResponse[]> {
    this.userRepository.verifyIfUserExists(author);

    const posts = await this.postRepository.findByAuthor(author, pagination);

    return posts.map(this.postAssembler.assemblePostResponse);
  }
}
