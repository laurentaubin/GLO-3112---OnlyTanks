import UserPreviewResponse from "../user/UserPreviewResponse";

interface UserTag {
  username: string;
  position: [number, number];
}

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  userTags?: UserTag[];
  author: UserPreviewResponse;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
}

export default PostResponse;
