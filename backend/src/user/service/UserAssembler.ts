import UserResponse from "./UserResponse";
import LoginResponse from "../../authentication/service/LoginResponse";
import User from "../domain/User";
import UserRequest from "./UserRequest";
import MultipleUsersResponse from "./MultipleUsersResponse";
import UserLoginResponse from "./UserLoginResponse";

export default class UserAssembler {
  assembleUser(userRequest: UserRequest): User {
    return {
      username: userRequest.username,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      email: userRequest.email,
      phoneNumber: userRequest.phoneNumber,
      imageUrl: userRequest.imageUrl
    };
  }

  assembleUserResponse(user: User): UserResponse {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      imageUrl: user.imageUrl
    };
  }

  assembleMultipleUsersResponse(users: User[]): MultipleUsersResponse {
    const assembledUsers = users.map(this.assembleUserResponse);

    return { users: assembledUsers, count: assembledUsers.length };
  }

  assembleUserLoginResponse(loginResponse: LoginResponse): UserLoginResponse {
    return {
      username: loginResponse.username,
      firstName: loginResponse.firstName,
      lastName: loginResponse.lastName,
      email: loginResponse.email,
      phoneNumber: loginResponse.phoneNumber,
      token: loginResponse.token
    };
  }
}
