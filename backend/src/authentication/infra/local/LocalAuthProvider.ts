import AuthProvider from "../AuthProvider";
import UserRepository from "../../../user/domain/UserRepository";
import UserAssembler from "../../../user/service/UserAssembler";
import LoginRequest from "../../service/LoginRequest";
import MissingUsernameException from "./exceptions/MissingUsernameException";
import { Token } from "../../domain/Token";
import { randomUUID } from "crypto";
import SessionRepository from "../../domain/SessionRepository";
import SessionNotFoundException from "../../domain/exceptions/SessionNotFoundException";
import { LoginResponse } from "../../service/LoginResponse";

export default class LocalAuthProvider implements AuthProvider {
  constructor(private userRepository: UserRepository, private userAssembler: UserAssembler, private sessionRepository: SessionRepository) {}

  public login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    if (!loginRequest.username) {
      throw new MissingUsernameException();
    }
    const userDto = await this.userRepository.findByUsername(loginRequest.username);
    const user = this.userAssembler.assembleUser(userDto);
    const token = randomUUID();
    return { ...user, token };
  };

  public verifyToken = async (token: Token): Promise<void> => {
    if (!(await this.sessionRepository.exists(token))) {
      throw new SessionNotFoundException();
    }
  };
}
