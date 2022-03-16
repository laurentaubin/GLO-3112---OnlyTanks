import User from "./User";

interface UserRepository {
  save(user: User): Promise<User>;

  updateUserPicture(username: string, imageUrl: string): Promise<User>;

  findByUsername(username: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByPartialUsername(partialUsername: string): Promise<User[]>;

  updateUserInformation(user: User): Promise<User>;

  verifyIfUserExists(username: string): Promise<void>;

  delete(username: string): Promise<void>;
}

export default UserRepository;
