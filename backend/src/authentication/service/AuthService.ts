import UserRepository from "../../user/domain/UserRepository";
import UserAssembler from "../../user/service/UserAssembler";
import { UserRequest } from "../../user/service/UserRequest";
import { UserResponse } from "../../user/service/UserResponse";

export default class AuthService {
  constructor(private userAssembler: UserAssembler, private userRepository: UserRepository) {}

  public async signup(userRequest: UserRequest): Promise<UserResponse> {
    const user = this.userAssembler.assembleUser(userRequest);
    const newUser = await this.userRepository.save(user);
    return this.userAssembler.assembleSignUpResponse(newUser);
  }
}
