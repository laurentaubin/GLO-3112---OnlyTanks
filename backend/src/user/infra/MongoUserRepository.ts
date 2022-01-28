import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import UserAssembler from "./UserAssembler";

export default class MongoDbUserRepository implements UserRepository {
  constructor(private userAssembler: UserAssembler) {
    this.userAssembler = userAssembler;
  }

  public async save(user: User): Promise<User> {
    const userModel = this.userAssembler.assembleUserDto(user);
    return this.userAssembler.assembleUser(await userModel.save());
  }
}
