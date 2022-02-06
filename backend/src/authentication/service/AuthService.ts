import UserRepository from "../../user/domain/UserRepository";
import UserAssembler from "../../user/service/UserAssembler";
import { UserRequest } from "../../user/service/UserRequest";
import { UserResponse } from "../../user/service/UserResponse";
import LoginRequest from "./LoginRequest";
import AuthProviderSelector from "./AuthProviderSelector";
import AuthProvider from "../infra/AuthProvider";

export default class AuthService {
  constructor(
    private userAssembler: UserAssembler,
    private userRepository: UserRepository,
    private authProviderSelector: AuthProviderSelector
  ) {}

  public async signup(userRequest: UserRequest): Promise<UserResponse> {
    const user = this.userAssembler.assembleUser(userRequest);
    const newUser = await this.userRepository.save(user);
    return this.userAssembler.assembleUserResponse(newUser);
  }

  public async login(loginRequest: LoginRequest): Promise<UserResponse> {
    const authProvider: AuthProvider = this.authProviderSelector.select(loginRequest.authProvider);
    const user = await authProvider.login(loginRequest);

    return this.userAssembler.assembleUserResponse(user);
  }
}
