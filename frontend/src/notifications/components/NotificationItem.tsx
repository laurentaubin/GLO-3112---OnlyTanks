import PostNotification from "../../main/domain/notifications/Notification";
import NotificationCardContent from "./popup/NotificationCardContent";

interface Props {
  postNotification: PostNotification;
}
const NotificationItem = ({ postNotification }: Props) => {
  return (
    <div className={"rounded-md hover:bg-gray-100 cursor-pointer py-1"}>
      <NotificationCardContent notification={postNotification} />
    </div>
  );
};

export default NotificationItem;
