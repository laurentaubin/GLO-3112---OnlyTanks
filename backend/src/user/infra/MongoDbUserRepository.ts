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

  public async verifyIfUserExists(username: string): Promise<void> {
    const userDto = (await UserModel.findOne({ username })) as unknown as UserDto;

    if (!userDto) {
      throw new UserNotFoundException();
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const userDto = (await UserModel.findOne({ email: email })) as unknown as UserDto;

    if (!userDto) {
      throw new UserNotFoundException();
    }

    return this.userAssembler.assembleUser(userDto);
  }

  public async findAll(): Promise<User[]> {
    const usersDto = (await UserModel.find()) as unknown as UserDto[];

    return usersDto.map(this.userAssembler.assembleUser);
  }
  public async updateUserPicture(username: string, imageUrl: string): Promise<void> {
    const updatedUserDto = (await UserModel.findOneAndUpdate(
      { username: username },
      { imageUrl: imageUrl },
      {
        new: true
      }
    )) as unknown as UserDto;

    if (!updatedUserDto) {
      throw new UserNotFoundException();
    }
  }

  public async updateUserInformation(user: User): Promise<User> {
    const updatedUserDto = (await UserModel.findOneAndUpdate({ username: user.username }, user, {
      new: true
    })) as unknown as UserDto;

    if (!updatedUserDto) {
      throw new UserNotFoundException();
    }

    return this.userAssembler.assembleUser(updatedUserDto);
  }
}
