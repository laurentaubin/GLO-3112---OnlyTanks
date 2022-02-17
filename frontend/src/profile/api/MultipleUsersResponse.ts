import UserResponse from "./UserResponse";

export interface MultipleUsersResponse {
  users: UserResponse[];
  count: number;
}

export default MultipleUsersResponse;
