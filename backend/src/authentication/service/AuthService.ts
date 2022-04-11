import { constants } from "../../constants/constants";
import PostRepository from "../../post/domain/PostRepository";
import UserRepository from "../../user/domain/UserRepository";
import UserAssembler from "../../user/service/UserAssembler";
import UserFactory from "../../user/service/UserFactory";
import UserLoginResponse from "../../user/service/UserLoginResponse";
import UserResponse from "../../user/service/UserResponse";
import SignupRequest from "../api/dto/SignupRequest";
import AuthProvider from "../domain/AuthProvider";
import LoginConfirmation from "../domain/LoginConfirmation";
import LoginRequest from "../domain/LoginRequest";
import Provider from "../domain/Provider";
import SessionRepository from "../domain/SessionRepository";
import Token from "../domain/Token";
import AuthProviderSelector from "./AuthProviderSelector";
import LoginResponse from "./LoginResponse";

export default class AuthService {
  constructor(
    private userAssembler: UserAssembler,
    private userFactory: UserFactory,
    private userRepository: UserRepository,
    private authProviderSelector: AuthProviderSelector,
    private sessionRepository: SessionRepository,
    private postRepository: PostRepository
  ) {}

  public async deleteUser(username: string): Promise<void> {
    await this.postRepository.deleteAllByUsername(username);
    await this.postRepository.deleteAllCommentsByUsername(username);
    await this.postRepository.deleteAllLikesByUsername(username);
    await this.userRepository.delete(username);
    await this.sessionRepository.delete(username);
  }

  public async signup(signupRequest: SignupRequest): Promise<UserLoginResponse> {
    const user = this.userFactory.create(signupRequest, constants.default.profilePicture);
    const newUser = await this.userRepository.save(user);

    const loginRequest: LoginRequest = {
      username: newUser.username,
      token: signupRequest.authToken,
      authProvider: Provider[signupRequest.authProvider as keyof typeof Provider]
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
