import UserPreviewResponse from "./UserPreviewResponse";

interface UserPreviewsResponse {
  likedBy: UserPreviewResponse[];
  count: number;
}

export default UserPreviewsResponse;
