import PostNotificationMessage from "./PostNotificationMessage";

interface ServerToClientEvents {
  notification: (message: PostNotificationMessage) => void;
}

export default ServerToClientEvents;
