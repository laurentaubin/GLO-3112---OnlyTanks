import UserResponse from "./UserResponse";

interface MultipleUsersResponse {
  users: UserResponse[];
  count: number;
}

export default MultipleUsersResponse;
