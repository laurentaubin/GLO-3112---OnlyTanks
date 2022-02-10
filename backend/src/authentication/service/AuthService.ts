import UserRepository from "../../user/domain/UserRepository";
import UserAssembler from "../../user/service/UserAssembler";
import { UserRequest } from "../../user/service/UserRequest";
import { UserResponse } from "../../user/service/UserResponse";
import LoginRequest from "./LoginRequest";
import AuthProviderSelector from "./AuthProviderSelector";
import AuthProvider from "../infra/AuthProvider";
import { Token } from "../domain/Token";
import Provider from "../domain/Provider";
import SessionRepository from "../domain/SessionRepository";
import { LoginResponse } from "./LoginResponse";
import { UserLoginResponse } from "../../user/service/UserLoginResponse";

export default class AuthService {
  constructor(
    private userAssembler: UserAssembler,
    private userRepository: UserRepository,
    private authProviderSelector: AuthProviderSelector,
    private sessionRepository: SessionRepository
  ) {}

  public async signup(userRequest: UserRequest, authProviderName: string, token?: string): Promise<UserResponse> {
    const user = this.userAssembler.assembleUser(userRequest);
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
    const loginResponse: LoginResponse = await authProvider.login(loginRequest);
    await this.sessionRepository.save({ username: loginResponse.username, token: { value: loginResponse.token } });

    return this.userAssembler.assembleUserLoginResponse(loginResponse);
  }

  public validateToken = async (authProviderName: string, token: string): Promise<void> => {
    const authProvider: AuthProvider = this.authProviderSelector.select(Provider[authProviderName as keyof typeof Provider]);
    const sessionToken: Token = { value: token };
    await authProvider.verifyToken(sessionToken);
  };
}
