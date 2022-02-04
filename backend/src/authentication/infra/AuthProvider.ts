import User from "../../user/domain/User";
import LoginRequest from "../service/LoginRequest";

interface AuthProvider {
  login(loginRequest: LoginRequest): Promise<User>;
}

export default AuthProvider;
