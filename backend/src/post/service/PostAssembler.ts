import StorageResponse from "src/storage/domain/S3StorageResponse";
import generateStringId from "../../utils/generateId";
import PostResponse from "../api/PostResponse";
import PostBody from "../api/PostBody";
import Post from "../domain/Post";

export default class PostAssembler {
  public assemblePost(postRequest: PostBody, storageResponse: StorageResponse): Post {
    const postId: string = generateStringId();

    return {
      caption: postRequest.caption,
      hashtags: postRequest.hashtags,
      author: postRequest.author,
      imageUrl: storageResponse.Location,
      id: postId
    };
  }

  public assemblePostResponse(post: Post): PostResponse {
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      hashtags: post.hashtags,
      author: post.author,
      createdAt: post.createdAt!
    };
  }
}
