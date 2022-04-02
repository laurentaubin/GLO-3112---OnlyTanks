import PostRequestBody from "../api/PostRequestBody";
import Post from "../domain/Post";
import UUIDGenerator from "../../utils/UUIDGenerator";

export default class PostFactory {
  public create(postRequest: PostRequestBody, imageUrl: string): Post {
    return {
      caption: postRequest.caption,
      comments: [],
      hashtags: postRequest.hashtags,
      author: postRequest.author,
      userTags: postRequest.userTags,
      imageUrl: imageUrl,
      id: UUIDGenerator.generate(),
      likes: []
    };
  }
}
