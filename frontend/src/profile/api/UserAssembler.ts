import User from "../../main/domain/user/User";
import UserResponse from "./UserResponse";
import MultipleUsersResponse from "./MultipleUsersResponse";
import UserPreviewsResponse from "../../main/api/user/UserPreviewsResponse";
import UserPreview from "../../main/domain/user/UserPreview";
import UserPreviewResponse from "../../main/api/user/UserPreviewResponse";

class UserAssembler {
  public assembleToUser(userResponse: UserResponse): User | undefined {
    if (userResponse) {
      return new User(
        userResponse.username,
        userResponse.firstName,
        userResponse.lastName,
        userResponse.email,
        userResponse.phoneNumber,
        userResponse.imageUrl,
        userResponse.createdAt,
        userResponse.totalNumberOfLikes
      );
    }
  }

  public assembleToUsers(usersResponse: MultipleUsersResponse): User[] {
    if (usersResponse) {
      return usersResponse.users.map(
        (userResponse) =>
          new User(
            userResponse.username,
            userResponse.firstName,
            userResponse.lastName,
            userResponse.email,
            userResponse.phoneNumber,
            userResponse.imageUrl,
            userResponse.createdAt,
            userResponse.totalNumberOfLikes
          )
      );
    } else {
      return [];
    }
  }

  public assembleToUserPreviews(userPreviewsResponse: UserPreviewsResponse): UserPreview[] {
    if (userPreviewsResponse) {
      return userPreviewsResponse.likedBy.map((userPreviewResponse) => {
        return {
          username: userPreviewResponse.username,
          imageUrl: userPreviewResponse.imageUrl
        };
      });
    } else {
      return [];
    }
  }
}

export default new UserAssembler();
