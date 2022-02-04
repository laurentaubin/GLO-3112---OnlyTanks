import AuthProvider from "../AuthProvider";
import User from "../../../user/domain/User";
import UserRepository from "../../../user/domain/UserRepository";
import UserAssembler from "../../../user/service/UserAssembler";
import LoginRequest from "../../service/LoginRequest";
import MissingUsernameException from "./exceptions/MissingUsernameException";

export default class LocalAuthProvider implements AuthProvider {
  constructor(private userRepository: UserRepository, private userAssembler: UserAssembler) {}

  public async login(loginRequest: LoginRequest): Promise<User> {
    if (!loginRequest.username) {
      throw new MissingUsernameException();
    }
    const userDto = await this.userRepository.findByUsername(loginRequest.username);
    return this.userAssembler.assembleUser(userDto);
  }
}
