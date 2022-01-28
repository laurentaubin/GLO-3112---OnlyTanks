import User from "../../domain/User";
import { UserRequest } from "../dtos/UserRequest";
import { UserResponse } from "../dtos/UserResponse";

export default class UserAssembler {
  assembleUser(signUpRequest: UserRequest): User {
    return {
      username: signUpRequest.username,
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      email: signUpRequest.email,
      phoneNumber: signUpRequest.phoneNumber
    };
  }

  assembleSignUpResponse(user: User): UserResponse {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
  }
}
