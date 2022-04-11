import PostNotification from "../../main/domain/notifications/Notification";
import NotificationType from "../../main/domain/notifications/NotificationType";
import formatTimestamp from "../../main/utils/formatTimestamp";

interface Props {
  notification: PostNotification;
}

export const NotificationCardText = ({ notification }: Props) => {
  return (
    <div className="ml-2">
      <p className="mt-2">
        <span className="font-bold">{notification.from}</span>
        {notification.type === NotificationType.POST_LIKE && <span> liked your post.</span>}
        {notification.type === NotificationType.POST_COMMENT && <span> commented on your post.</span>}
      </p>
      <p className="text-blue-primary font-semibold text-sm">{formatTimestamp({ datetime: notification.timestamp.toDate() })}</p>
    </div>
  );
};
