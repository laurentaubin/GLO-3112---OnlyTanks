import Pagination from "src/utils/pagination/Pagination";
import UserNotFoundException from "../domain/exceptions/UserNotFoundException";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import UserModel, { UserDto } from "./models/UserModel";
import MongoDbUserAssembler from "./MongoDbUserAssembler";
import MongoDbQuery from "../../utils/pagination/MongoDbQuery";
import Paginator from "../../utils/pagination/Paginator";

export default class MongoDbUserRepository implements UserRepository {
  constructor(private userAssembler: MongoDbUserAssembler, private paginator: Paginator) {
    this.userAssembler = userAssembler;
    this.paginator = paginator;
  }

  public async delete(username: string): Promise<void> {
    try {
      await UserModel.deleteOne({ username });
    } catch (e) {
      throw new UserNotFoundException();
    }
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

  public async findByPartialUsername(partialUsername: string): Promise<User[]> {
    if (partialUsername) {
      const usersDto = (await UserModel.find({
        username: {
          $regex: partialUsername,
          $options: "i"
        }
      }).lean()) as unknown as UserDto[];

      return usersDto.map(this.userAssembler.assembleUser);
    }

    return [];
  }

  public async updateUserPicture(username: string, imageUrl: string): Promise<User> {
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
    return this.userAssembler.assembleUser(updatedUserDto);
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

  public async findOrderedByTotalNumberOfLikes(pagination: Pagination): Promise<User[]> {
    let query: MongoDbQuery = UserModel.find().sort("-totalNumberOfLikes").lean();
    query = this.paginator.addToQuery(pagination, query);

    const usersQuery = (await query.find()) as unknown as UserDto[];

    return usersQuery.map(this.userAssembler.assembleUser);
  }
}
