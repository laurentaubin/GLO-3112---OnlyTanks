import AuthProvider from "../AuthProvider";
import User from "../../../user/domain/User";
import UserRepository from "../../../user/domain/UserRepository";
import UserAssembler from "../../../user/service/UserAssembler";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import LoginRequest from "../../service/LoginRequest";
import MissingTokenException from "./exceptions/MissingTokenException";
import EmailNotLinkedToGoogleAccountException from "./exceptions/EmailNotLinkedToGoogleAccountException";

export default class GoogleAuthProvider implements AuthProvider {
  constructor(
    private clientId: string,
    private googleClient: OAuth2Client,
    private userRepository: UserRepository,
    private userAssembler: UserAssembler
  ) {}

  public login = async (loginRequest: LoginRequest): Promise<User> => {
    if (!loginRequest.token) {
      throw new MissingTokenException();
    }
    const tokenPayload = await this.fetchTokenPayload(loginRequest.token);

    if (!tokenPayload?.email) {
      throw new EmailNotLinkedToGoogleAccountException();
    }

    const userDto = await this.userRepository.findByEmail(tokenPayload.email);
    return this.userAssembler.assembleUser(userDto);
  };

  private fetchTokenPayload = async (token: string): Promise<TokenPayload | undefined> => {
    const ticket: LoginTicket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });
    return ticket.getPayload();
  };
}
