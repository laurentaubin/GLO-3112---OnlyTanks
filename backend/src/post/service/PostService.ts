import PictureStorage from "src/storage/domain/PictureStorage";
import PostBody from "../api/PostBody";
import Post from "../domain/Post";
import PostRepository from "../domain/PostRepository";
import PostAssembler from "./PostAssembler";

export default class PostService {
  constructor(private postAssembler: PostAssembler, private postRepository: PostRepository, private pictureStorage: PictureStorage) {}

  public async addPost(postRequest: PostBody) {
    const storageResponse = await this.pictureStorage.store(postRequest.file);

    const post: Post = this.postAssembler.assemblePost(postRequest, storageResponse);

    this.postRepository.save(post);
  }
}
