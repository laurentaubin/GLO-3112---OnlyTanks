import UserRepository from "../domain/UserRepository";
import UserAssembler from "./assemblers/UserAssembler";
import { UserRequest } from "./dtos/UserRequest";
import { UserResponse } from "./dtos/UserResponse";

export default class AuthService {
  constructor(private userAssembler: UserAssembler, private userRepository: UserRepository) {}

  public async signup(signUpRequest: UserRequest): Promise<UserResponse> {
    const user = this.userAssembler.assembleUser(signUpRequest);
    const newUser = await this.userRepository.save(user);
    return this.userAssembler.assembleSignUpResponse(newUser);
  }
}
