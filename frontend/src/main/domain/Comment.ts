import Timestamp from "./Timestamp";
import UserPreview from "./user/UserPreview";

interface Comment {
  id: string;
  author: UserPreview;
  comment: string;
  timestamp: Timestamp;
}

export default Comment;
