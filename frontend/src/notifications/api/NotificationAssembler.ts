import dayjs from "dayjs";
import PostNotification from "../../main/domain/notifications/Notification";
import NotificationType from "../../main/domain/notifications/NotificationType";
import PostNotificationMessage from "../../main/domain/notifications/PostNotificationMessage";

class NotificationAssembler {
  public assembleNotification(notification: PostNotificationMessage): PostNotification {
    return {
      id: notification.id,
      postId: notification.postId,
      from: notification.from,
      to: notification.to,
      type: NotificationType[notification.type as keyof typeof NotificationType],
      timestamp: dayjs(notification.timestamp)
    };
  }
}

export default new NotificationAssembler();
