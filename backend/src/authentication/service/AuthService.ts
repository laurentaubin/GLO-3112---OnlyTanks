import UserRepository from "../../user/domain/UserRepository";
import UserAssembler from "../../user/service/UserAssembler";
import LoginRequest from "../domain/LoginRequest";
import AuthProviderSelector from "./AuthProviderSelector";
import AuthProvider from "../domain/AuthProvider";
import Token from "../domain/Token";
import Provider from "../domain/Provider";
import SessionRepository from "../domain/SessionRepository";
import LoginResponse from "./LoginResponse";
import UserLoginResponse from "../../user/service/UserLoginResponse";
import UserFactory from "../../user/service/UserFactory";
import UserRequest from "../../user/service/UserRequest";
import { constants } from "../../constants/constants";
import LoginConfirmation from "../domain/LoginConfirmation";
import UserResponse from "../../user/service/UserResponse";

export default class AuthService {
  constructor(
    private userAssembler: UserAssembler,
    private userFactory: UserFactory,
    private userRepository: UserRepository,
    private authProviderSelector: AuthProviderSelector,
    private sessionRepository: SessionRepository
  ) {}

  public async signup(userRequest: UserRequest, authProviderName: string, token?: string): Promise<UserLoginResponse> {
    const user = this.userFactory.create(userRequest, constants.default.profilePicture);

    const newUser = await this.userRepository.save(user);

    const loginRequest: LoginRequest = {
      username: newUser.username,
      token: token,
      authProvider: Provider[authProviderName as keyof typeof Provider]
    };
    return this.login(loginRequest);
  }

  public async login(loginRequest: LoginRequest): Promise<UserLoginResponse> {
    const authProvider: AuthProvider = this.authProviderSelector.select(loginRequest.authProvider);
    const loginConfirmation: LoginConfirmation = await authProvider.login(loginRequest);

    const loginResponse: LoginResponse = { ...loginConfirmation };

    await this.sessionRepository.save({ username: loginResponse.username, token: { value: loginResponse.token } });

    return this.userAssembler.assembleUserLoginResponse(loginResponse);
  }

  public validateToken = async (authProviderName: string, token: string): Promise<void> => {
    const authProvider = this.authProviderSelector.select(Provider[authProviderName as keyof typeof Provider]);
    const sessionToken: Token = { value: token };
    await authProvider.verifyToken(sessionToken);
  };

  public getCurrentUser = async (authProviderName: string, token: string): Promise<UserResponse> => {
    const authProvider = this.authProviderSelector.select(Provider[authProviderName as keyof typeof Provider]);
    const sessionToken: Token = { value: token };

    const currentUsername = await authProvider.getCurrentUsername(sessionToken);
    const currentUser = await this.userRepository.findByUsername(currentUsername);

    return this.userAssembler.assembleUserResponse(currentUser);
  };
}
