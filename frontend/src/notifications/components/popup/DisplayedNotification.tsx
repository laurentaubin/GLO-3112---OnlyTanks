import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostNotification from "../../../main/domain/notifications/Notification";
import { NotificationCard } from "./NotificationCard";

interface Props {
  notification: PostNotification | null;
}
export const DisplayedNotification = ({ notification }: Props) => {
  const [displayedNotification, setDisplayedNotification] = useState<PostNotification | null>(null);
  const [lastReceivedNotification, setLastReceivedNotification] = useState<PostNotification | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (
      notification?.from === lastReceivedNotification?.from &&
      notification?.postId &&
      lastReceivedNotification?.postId &&
      notification.timestamp.isSame(lastReceivedNotification.timestamp)
    )
      return;

    setDisplayedNotification(notification);
    setLastReceivedNotification(notification);
  }, [notification, lastReceivedNotification]);

  const onClick = () => {
    if (!notification) return;

    setDisplayedNotification(null);
    router.push(`/posts/${notification.postId}`);
  };

  const onClose = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) event.stopPropagation();
    setDisplayedNotification(null);
  };

  return <>{displayedNotification && <NotificationCard notification={displayedNotification} onClick={onClick} onClose={onClose} />}</>;
};
