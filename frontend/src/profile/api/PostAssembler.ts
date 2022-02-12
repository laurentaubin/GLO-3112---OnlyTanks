import Post from "../domain/Post";
import PostResponse from "./PostResponse";

class PostAssembler {
  public assemblePost(postResponse: PostResponse): Post {
    return {
      caption: postResponse.caption,
      createdAt: postResponse.createdAt,
      author: postResponse.author,
      id: postResponse.id,
      imageUrl: postResponse.imageUrl,
      hashtags: postResponse.hashtags
    };
  }
}

export default new PostAssembler();
