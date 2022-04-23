import PostNotification from "./PostNotification";

interface PostNotificationRepository {
  findAllByUsername(username: string): Promise<PostNotification[]>;

  save(postNotification: PostNotification): Promise<void>;
}

export default PostNotificationRepository;
