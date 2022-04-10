import Timestamp from "./Timestamp";
import UserPreview from "./user/UserPreview";

interface CommentWithAuthorPreview {
  id: string;
  author: UserPreview;
  comment: string;
  timestamp: Timestamp;
}

export default CommentWithAuthorPreview;
