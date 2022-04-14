import PostResponse from "../api/PostResponse";
import Post from "../domain/Post";
import UserPreview from "../../user/domain/UserPreview";

export default class PostAssembler {
  public assemblePostResponse(post: Post, userPreview: UserPreview, requesterUsername: string): PostResponse {
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      comments: post.comments,
      userTags: post.userTags,
      hashtags: post.hashtags,
      author: { username: userPreview.username, imageUrl: userPreview.imageUrl },
      commentsPreview: post.comments.slice(-2),
      createdAt: post.createdAt!,
      isLiked: post.likes?.includes(requesterUsername),
      numberOfLikes: post.likes?.length,
      numberOfComments: post.comments?.length
    };
  }
}
