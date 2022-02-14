import LoginRequest from "./LoginRequest";
import Token from "./Token";
import LoginConfirmation from "./LoginConfirmation";

interface AuthProvider {
  login(loginRequest: LoginRequest): Promise<LoginConfirmation>;

  verifyToken(token: Token): void;
}

export default AuthProvider;
