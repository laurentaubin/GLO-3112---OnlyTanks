import PostNotificationMessage from "./dto/PostNotificationMessage";

interface ServerToClientEvents {
  notification: (message: PostNotificationMessage) => void;
}

export default ServerToClientEvents;
