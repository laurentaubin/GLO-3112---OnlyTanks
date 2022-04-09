import PostNotification from "./PostNotification";

interface NotificationIssuer {
  issue(postNotification: PostNotification): void;
}

export default NotificationIssuer;
