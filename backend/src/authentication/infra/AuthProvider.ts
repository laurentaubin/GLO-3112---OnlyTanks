import LoginRequest from "../service/LoginRequest";
import { Token } from "../domain/Token";
import { LoginResponse } from "../service/LoginResponse";

interface AuthProvider {
  login(loginRequest: LoginRequest): Promise<LoginResponse>;
  verifyToken(token: Token): void;
}

export default AuthProvider;
