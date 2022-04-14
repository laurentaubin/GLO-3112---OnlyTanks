import PostResponse from "../api/PostResponse";
import Post from "../domain/Post";
import ImageUrlVerificator from "../../storage/service/ImageUrlVerificator";
import UserPreview from "src/user/domain/UserPreview";

export default class PostAssembler {
  constructor(private imageUrlVerificatior: ImageUrlVerificator) {}

  public async assemblePostResponse(
    post: Post,
    userPreview: UserPreview,
    requesterUsername: string,
    preview?: boolean
  ): Promise<PostResponse> {
    const userThumbnailUrl: string = await this.imageUrlVerificatior.verifyThumbnail(userPreview.imageUrl);

    const previewPostImageUrl: string = preview ? await this.imageUrlVerificatior.verifyPreview(post.imageUrl) : post.imageUrl;

    return {
      id: post.id,
      imageUrl: previewPostImageUrl,
      caption: post.caption,
      comments: post.comments,
      userTags: post.userTags,
      hashtags: post.hashtags,
      author: {
        username: userPreview.username,
        imageUrl: userThumbnailUrl
      },
      commentsPreview: post.comments.slice(-2),
      createdAt: post.createdAt!,
      isLiked: post.likes?.includes(requesterUsername),
      numberOfLikes: post.likes?.length,
      numberOfComments: post.comments?.length
    };
  }
}
