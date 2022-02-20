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
  author: { username: string; imageUrl: string };
  createdAt: number;
}

export default PostResponse;
