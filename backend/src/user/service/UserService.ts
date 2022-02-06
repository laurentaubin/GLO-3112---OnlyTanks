import UserRepository from "../domain/UserRepository";
import UserAssembler from "./UserAssembler";
import { UserResponse } from "./UserResponse";

class UserService {
  constructor(private userAssembler: UserAssembler, private userRepository: UserRepository) {}

  public async findByUsername(username: string): Promise<UserResponse> {
    const user = await this.userRepository.findByUsername(username);
    return this.userAssembler.assembleUserResponse(user);
  }
}

export default UserService;
