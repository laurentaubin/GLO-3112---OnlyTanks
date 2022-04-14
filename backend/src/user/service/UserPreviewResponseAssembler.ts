import UserPreviewResponse from "../service/UserPreviewResponse";
import UserPreview from "../domain/UserPreview";
import User from "../domain/User";

export default class UserPreviewAssembler {
  public assembleUserPreview(user: User): UserPreview {
    return {
      username: user.username,
      imageUrl: user.imageUrl,
      totalNumberOfLikes: user.totalNumberOfLikes
    };
  }

  public assembleUserPreviewResponseFromUser(user: User): UserPreviewResponse {
    return {
      username: user.username,
      imageUrl: user.imageUrl,
      totalNumberOfLikes: user.totalNumberOfLikes
    };
  }
}
