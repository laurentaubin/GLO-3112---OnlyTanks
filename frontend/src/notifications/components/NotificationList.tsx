import Link from "next/link";
import PostNotification from "../../main/domain/notifications/Notification";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: PostNotification[];
}
const NotificationList = ({ notifications }: Props) => {
  return (
    <div className="flex flex-row flex-wrap mt-12 p-4 rounded-lg">
      <h1 className="font-semibold text-2xl mb-2">Notifications</h1>

      {notifications
        .slice()
        .reverse()
        .map((notification) => (
          <Link href={`/posts/${notification.postId}`} passHref key={notification.id}>
            <div className="w-full">
              <a>
                <NotificationItem postNotification={notification} />
              </a>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default NotificationList;
