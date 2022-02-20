import Timestamp from "./Timestamp";
import UserPreview from "./UserPreview";
import UserTag from "./UserTag";

interface Post {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  userTags: UserTag[];
  author: UserPreview;
  timestamp: Timestamp;
}

export default Post;
