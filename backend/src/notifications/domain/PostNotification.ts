import NotificationType from "./NotificationType";

interface PostNotification {
  id: string;
  postId: string;
  to: string;
  from: string;
  type: NotificationType;
  timestamp?: Date;
}

export default PostNotification;
