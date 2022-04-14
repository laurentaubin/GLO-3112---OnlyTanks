import UserPreviewResponse from "../../main/api/user/UserPreviewResponse";
import Suggestion from "../../main/domain/Suggestion";

class SuggestionAssembler {
  public assembleFromUserPreviewResponse(userPreviewResponse: UserPreviewResponse): Suggestion {
    return {
      username: userPreviewResponse.username,
      profileImageUrl: userPreviewResponse.imageUrl,
      totalNumberOfLikes: userPreviewResponse.totalNumberOfLikes,
      backgroundImageUrl: "https://img.wattpad.com/cover/194670539-288-k620282.jpg"
    };
  }
}

export default new SuggestionAssembler();
