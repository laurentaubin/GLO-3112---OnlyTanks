import AuthProvider from "../../domain/AuthProvider";
import UserRepository from "../../../user/domain/UserRepository";
import UserAssembler from "../../../user/service/UserAssembler";
import LoginRequest from "../../domain/LoginRequest";
import MissingUsernameException from "./exceptions/MissingUsernameException";
import Token from "../../domain/Token";
import SessionRepository from "../../domain/SessionRepository";
import SessionNotFoundException from "../../domain/exceptions/SessionNotFoundException";
import LoginConfirmation from "../../domain/LoginConfirmation";
import UUIDGenerator from "../../../utils/UUIDGenerator";

export default class LocalAuthProvider implements AuthProvider {
  constructor(private userRepository: UserRepository, private userAssembler: UserAssembler, private sessionRepository: SessionRepository) {}

  public login = async (loginRequest: LoginRequest): Promise<LoginConfirmation> => {
    if (!loginRequest.username) {
      throw new MissingUsernameException();
    }
    const user = await this.userRepository.findByUsername(loginRequest.username);
    const userResponse = this.userAssembler.assembleUserResponse(user);
    const token = UUIDGenerator.generate();
    return { ...userResponse, token };
  };

  public verifyToken = async (token: Token): Promise<void> => {
    if (!(await this.sessionRepository.exists(token))) {
      throw new SessionNotFoundException();
    }
  };

  public getCurrentUsername = async (token: Token): Promise<string> => {
    this.verifyToken(token);
    return await this.sessionRepository.findUsernameWithToken(token);
  };
}
