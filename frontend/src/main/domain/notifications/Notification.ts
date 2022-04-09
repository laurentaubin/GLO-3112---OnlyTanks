import { Dayjs } from "dayjs";
import NotificationType from "./NotificationType";

interface PostNotification {
  postId: string;
  to: string;
  from: string;
  type: NotificationType;
  timestamp: Dayjs;
}

export default PostNotification;
