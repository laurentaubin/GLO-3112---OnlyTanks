import LoginRequest from "./LoginRequest";
import Token from "./Token";
import LoginConfirmation from "./LoginConfirmation";

interface AuthProvider {
  login(loginRequest: LoginRequest): Promise<LoginConfirmation>;

  verifyToken(token: Token): void;

  getCurrentUsername(sessionToken: Token): Promise<string>;
}

export default AuthProvider;
