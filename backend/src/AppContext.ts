import AuthService from "./authentication/service/AuthService";
import MongoDbUserAssembler from "./user/infra/MongoDbUserAssembler";
import MongoDbUserRepository from "./user/infra/MongoUserRepository";
import UserAssembler from "./user/service/UserAssembler";
import UserService from "./user/service/UserService";

const userAssembler = new UserAssembler();
const mongoDbUserAssembler = new MongoDbUserAssembler();

const userRepository = new MongoDbUserRepository(mongoDbUserAssembler);

export const userService = new UserService(userRepository);
export const authService = new AuthService(userAssembler, userRepository);
