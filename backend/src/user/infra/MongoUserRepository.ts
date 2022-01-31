import UserNotFoundException from "../domain/exceptions/UserNotFoundException";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import UserModel, { UserDto } from "./models/UserModel";
import MongoDbUserAssembler from "./MongoDbUserAssembler";

export default class MongoDbUserRepository implements UserRepository {
  constructor(private userAssembler: MongoDbUserAssembler) {
    this.userAssembler = userAssembler;
  }

  public async save(user: User): Promise<User> {
    const userModel = this.userAssembler.assembleUserDto(user);
    return this.userAssembler.assembleUser(await userModel.save());
  }

  public async findByUsername(username: string): Promise<User> {
    const userDto = (await UserModel.findOne({ username })) as unknown as UserDto;

    if (!userDto) {
      throw new UserNotFoundException();
    }

    return this.userAssembler.assembleUser(userDto);
  }
}
