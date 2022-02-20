import UserRequest from "../service/UserRequest";
import UserDto from "./dto/UserDto";

export default class UserRequestAssembler {
  assembleUserRequest(userDto: UserDto): UserRequest {
    return {
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phoneNumber: userDto.phoneNumber,
      imageUrl: userDto.imageUrl,
      createdAt: userDto.createdAt
    };
  }
}
