import NotificationType from "../domain/NotificationType";

interface NotificationResponse {
  id: string;
  postId: string;
  to: string;
  from: string;
  type: NotificationType;
  timestamp?: Date;
}

export default NotificationResponse;
