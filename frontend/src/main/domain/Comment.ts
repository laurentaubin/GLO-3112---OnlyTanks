import Timestamp from "./Timestamp";

interface Comment {
  id: string;
  author: string;
  comment: string;
  timestamp: Timestamp;
}

export default Comment;
