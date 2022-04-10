import Post from "../../domain/post/Post";
import PostResponse from "./PostResponse";
import dayjs from "dayjs";
import HashtagsFormatter from "../../utils/HashtagsFormatter";
import CommentAssembler from "../../../post/api/CommentAssembler";

class PostAssembler {
  public assemblePost(postResponse: PostResponse): Post {
    const userTags = postResponse.userTags
      ? postResponse.userTags.map((tag) => ({ username: tag.username, position: tag.position.map((pos) => pos * 100) }))
      : [];

    return {
      caption: postResponse.caption,
      timestamp: { datetime: dayjs(postResponse.createdAt).toDate() },
      author: { ...postResponse.author },
      id: postResponse.id,
      imageUrl: postResponse.imageUrl,
      userTags: userTags,
      hashtags: HashtagsFormatter.addHashtagSymbol(postResponse.hashtags),
      commentsPreview: CommentAssembler.assembleToComments(postResponse.commentsPreview),
      numberOfComments: postResponse.numberOfComments,
      isLiked: postResponse.isLiked,
      numberOfLikes: postResponse.numberOfLikes
    };
  }
}

export default new PostAssembler();
