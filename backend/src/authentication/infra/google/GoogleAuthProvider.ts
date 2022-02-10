import AuthProvider from "../AuthProvider";
import User from "../../../user/domain/User";
import UserRepository from "../../../user/domain/UserRepository";
import UserAssembler from "../../../user/service/UserAssembler";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import LoginRequest from "../../service/LoginRequest";
import MissingTokenException from "./exceptions/MissingTokenException";
import EmailNotLinkedToGoogleAccountException from "./exceptions/EmailNotLinkedToGoogleAccountException";
import InvalidTokenException from "./exceptions/InvalidTokenException";
import { Token } from "../../domain/Token";
import { LoginResponse } from "../../service/LoginResponse";
import SessionRepository from "../../domain/SessionRepository";
import SessionNotFoundException from "../../domain/exceptions/SessionNotFoundException";

export default class GoogleAuthProvider implements AuthProvider {
  constructor(
    private clientId: string,
    private googleClient: OAuth2Client,
    private userRepository: UserRepository,
    private userAssembler: UserAssembler,
    private sessionRepository: SessionRepository
  ) {}

  public login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    if (!loginRequest.token) {
      throw new MissingTokenException();
    }
    const tokenPayload = await this.fetchTokenPayload(loginRequest.token);

    if (!tokenPayload?.email) {
      throw new EmailNotLinkedToGoogleAccountException();
    }

    const userDto = await this.userRepository.findByEmail(tokenPayload.email);
    const user: User = this.userAssembler.assembleUser(userDto);
    return { ...user, token: loginRequest.token };
  };

  public verifyToken = async (token: Token): Promise<void> => {
    try {
      await this.fetchTokenPayload(token.value);
    } catch (e) {
      throw new InvalidTokenException();
    }
    if (!(await this.sessionRepository.exists(token))) {
      throw new SessionNotFoundException();
    }
  };

  private fetchTokenPayload = async (token: string): Promise<TokenPayload | undefined> => {
    const ticket: LoginTicket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });
    return ticket.getPayload();
  };
}
