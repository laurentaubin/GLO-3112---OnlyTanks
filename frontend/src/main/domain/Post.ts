import Timestamp from "./Timestamp";
import UserPreview from "./UserPreview";

interface Post {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  author: UserPreview;
  timestamp: Timestamp;
}

export default Post;
