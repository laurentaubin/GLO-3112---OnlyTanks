import Post from "../../domain/Post";
import PostResponse from "./PostResponse";
import dayjs from "dayjs";
import formatHashtags from "../../utils/formatHashtags";

class PostAssembler {
  public assemblePost(postResponse: PostResponse): Post {
    return {
      caption: postResponse.caption,
      timestamp: { datetime: dayjs(postResponse.createdAt).toDate() },
      author: { ...postResponse.author },
      id: postResponse.id,
      imageUrl: postResponse.imageUrl,
      hashtags: formatHashtags(postResponse.hashtags)
    };
  }
}

export default new PostAssembler();
