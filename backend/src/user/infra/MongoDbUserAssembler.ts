import User from "../domain/User";
import UserModel, { UserDto } from "./models/UserModel";

export default class MongoDbUserAssembler {
  assembleUserDto(user: User) {
    return new UserModel({
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      totalNumberOfLikes: user.totalNumberOfLikes ?? 0
    });
  }

  assembleUser(userDto: UserDto): User {
    return {
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phoneNumber: userDto.phoneNumber,
      imageUrl: userDto.imageUrl,
      createdAt: userDto.createdAt,
      totalNumberOfLikes: userDto.totalNumberOfLikes
    };
  }
}
