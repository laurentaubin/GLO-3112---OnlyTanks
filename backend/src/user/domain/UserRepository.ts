import User from "./User";
import Pagination from "../../utils/pagination/Pagination";

interface UserRepository {
  save(user: User): Promise<User>;

  updateUserPicture(username: string, imageUrl: string): Promise<User>;

  findByUsername(username: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByPartialUsername(partialUsername: string): Promise<User[]>;

  updateUserInformation(user: User): Promise<User>;

  verifyIfUserExists(username: string): Promise<void>;

  delete(username: string): Promise<void>;

  findOrderedByTotalNumberOfLikes(pagination: Pagination): Promise<User[]>;
}

export default UserRepository;
