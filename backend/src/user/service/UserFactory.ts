import User from "../domain/User";
import UserRequest from "./UserRequest";

class UserFactory {
  create(userRequest: UserRequest, imageUrl: string): User {
    return {
      username: userRequest.username,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      email: userRequest.email,
      phoneNumber: userRequest.phoneNumber,
      imageUrl: imageUrl,
      createdAt: userRequest.createdAt
    };
  }
}

export default UserFactory;
