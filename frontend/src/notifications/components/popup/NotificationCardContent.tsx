import { useUser } from "../../../main/api/user/useUser";
import PostNotification from "../../../main/domain/notifications/Notification";
import ProfilePicture from "../../../profile/components/ProfilePicture";
import { NotificationCardText } from ".././NotificationCardText";

interface Props {
  notification: PostNotification;
}

const NotificationCardContent = ({ notification }: Props) => {
  const { user } = useUser(notification.from);

  return (
    <div className="flex mt-2">
      <ProfilePicture imageUrl={user?.imageUrl} size={56} />
      <NotificationCardText notification={notification} />
    </div>
  );
};

export default NotificationCardContent;
