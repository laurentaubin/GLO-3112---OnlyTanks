import UserRequest from "../../../user/api/dto/UserDto";

interface SignupRequest extends UserRequest {
  authProvider: string;
  authToken: string;
}

export default SignupRequest;
