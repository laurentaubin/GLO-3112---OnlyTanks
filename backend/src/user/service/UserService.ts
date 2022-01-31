import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }
}

export default UserService;
