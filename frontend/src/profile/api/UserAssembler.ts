import User from "../../main/domain/User";
import UserResponse from "./UserResponse";
import MultipleUsersResponse from "./MultipleUsersResponse";

class UserAssembler {
  public assembleToUser(userResponse: UserResponse): User | undefined {
    if (userResponse) {
      return new User(userResponse.username, userResponse.firstName, userResponse.lastName, userResponse.email, userResponse.phoneNumber);
    }
  }

  public assembleToUsers(UsersResponse: MultipleUsersResponse): User[] {
    if (UsersResponse) {
      return UsersResponse.users.map(
        (userResponse) =>
          new User(userResponse.username, userResponse.firstName, userResponse.lastName, userResponse.email, userResponse.phoneNumber)
      );
    } else {
      return [];
    }
  }
}

export default new UserAssembler();
