import Provider from "./Provider";

interface LoginRequest {
  authProvider: Provider;
  token?: string;
  username?: string;
}

export default LoginRequest;
