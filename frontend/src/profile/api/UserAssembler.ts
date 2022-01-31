import User from "../../main/domain/User";
import UserResponse from "./UserResponse";

class UserAssembler {
  public assembleToUser(userResponse: UserResponse): User | undefined {
    if (userResponse) {
      return new User(userResponse.username, userResponse.firstName, userResponse.lastName, userResponse.email, userResponse.phoneNumber);
    }
  }
}

export default new UserAssembler();
