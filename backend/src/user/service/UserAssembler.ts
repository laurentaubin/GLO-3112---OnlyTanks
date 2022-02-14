import UserResponse from "./UserResponse";
import LoginResponse from "../../authentication/service/LoginResponse";
import User from "../domain/User";
import UserLoginResponse from "./UserLoginResponse";

export default class UserAssembler {
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
