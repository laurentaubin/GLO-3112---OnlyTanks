import { useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useUser } from "../../main/api/user/useUser";
import PostNotification from "../../main/domain/notifications/Notification";
import NotificationType from "../../main/domain/notifications/NotificationType";
import formatTimestamp from "../../main/utils/formatTimestamp";
import ProfilePicture from "../../profile/components/ProfilePicture";

const CLOSING_DELAY_IN_MS = 5000;

interface Props {
  notification: PostNotification;
  onClose: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick: () => void;
}

export const NotificationCard = ({ notification, onClose, onClick }: Props) => {
  const { user } = useUser(notification.from);

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, CLOSING_DELAY_IN_MS);
  }, [onClose]);

  return (
    <div className="fixed z-40 bottom-24 left-4">
      <div className="w-72 h-32 border bg-white shadow-xl pt-2 px-4 cursor-pointer" onClick={onClick}>
        <div className="flex">
          <h1 className="font-semibold text-md">New notification</h1>
          <button className="my-auto ml-auto" onClick={onClose}>
            <TiDeleteOutline size={24} />
          </button>
        </div>
        <div className="flex mt-2">
          <ProfilePicture imageUrl={user?.imageUrl} size={56} />
          <div className="ml-2">
            {notification.type === NotificationType.POST_LIKE && (
              <p className="mt-2">
                <span className="font-bold">{notification.from}</span>
                <span> liked your post.</span>
              </p>
            )}
            <p className="text-blue-primary font-semibold text-sm mt-2">{formatTimestamp({ datetime: notification.timestamp.toDate() })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
