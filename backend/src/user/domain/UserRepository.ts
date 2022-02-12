import User from "./User";

interface UserRepository {
  save(user: User): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  verifyIfUserExists(username: string): Promise<void>;
}

export default UserRepository;
