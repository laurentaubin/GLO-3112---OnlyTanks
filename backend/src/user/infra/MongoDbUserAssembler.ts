import User from "../domain/User";
import UserModel, { UserDto } from "./models/UserModel";

export default class MongoDbUserAssembler {
  assembleUserDto(user: User) {
    return new UserModel({
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber
    });
  }

  assembleUser(userDto: UserDto): User {
    return {
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phoneNumber: userDto.phoneNumber
    };
  }
}
