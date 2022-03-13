import PostNotification from "./PostNotification";

interface PostNotificationRepository {
  save(postNotification: PostNotification): Promise<void>;
}

export default PostNotificationRepository;
