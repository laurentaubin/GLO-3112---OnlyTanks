import AuthProvider from "../../domain/AuthProvider";
import UserRepository from "../../../user/domain/UserRepository";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import LoginRequest from "../../domain/LoginRequest";
import MissingTokenException from "./exceptions/MissingTokenException";
import EmailNotLinkedToGoogleAccountException from "./exceptions/EmailNotLinkedToGoogleAccountException";
import InvalidTokenException from "./exceptions/InvalidTokenException";
import Token from "../../domain/Token";
import SessionRepository from "../../domain/SessionRepository";
import SessionNotFoundException from "../../domain/exceptions/SessionNotFoundException";
import LoginConfirmation from "../../domain/LoginConfirmation";

export default class GoogleAuthProvider implements AuthProvider {
  constructor(
    private clientId: string,
    private googleClient: OAuth2Client,
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository
  ) {}

  public login = async (loginRequest: LoginRequest): Promise<LoginConfirmation> => {
    if (!loginRequest.token) {
      throw new MissingTokenException();
    }
    const tokenPayload = await this.fetchTokenPayload(loginRequest.token);

    if (!tokenPayload?.email) {
      throw new EmailNotLinkedToGoogleAccountException();
    }

    const user = await this.userRepository.findByEmail(tokenPayload.email);
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

  public getCurrentUsername = async (token: Token): Promise<string> => {
    this.verifyToken(token);
    return await this.sessionRepository.findUsernameWithToken(token);
  };

  private fetchTokenPayload = async (token: string): Promise<TokenPayload | undefined> => {
    const ticket: LoginTicket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });
    return ticket.getPayload();
  };
}
