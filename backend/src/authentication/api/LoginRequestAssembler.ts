import LoginRequest from "../domain/LoginRequest";
import Provider from "../domain/Provider";
import LoginRequestDto from "./dto/LoginRequestDto";

export default class LoginRequestAssembler {
  public assemble = (loginRequestDto: LoginRequestDto): LoginRequest => {
    return {
      authProvider: Provider[loginRequestDto.authProvider as keyof typeof Provider],
      token: loginRequestDto.token,
      username: loginRequestDto.username
    };
  };
}
