import User from "./User";

interface UserRepository {
  save(user: User): Promise<User>;
  findByUsername(username: string): Promise<User>;
}

export default UserRepository;
