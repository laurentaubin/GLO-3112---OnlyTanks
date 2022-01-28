import User from "./User";

interface UserRepository {
  save(user: User): Promise<User>;
}

export default UserRepository;
