import User from "./User";

interface UserRepository {
  save(user: User): Promise<User>;

  updateUserPicture(username: string, imageUrl: string): Promise<void>;

  findByUsername(username: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  verifyIfUserExists(username: string): Promise<void>;
}

export default UserRepository;
