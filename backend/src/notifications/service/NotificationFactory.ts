import UUIDGenerator from "../../utils/UUIDGenerator";
import NotificationType from "../domain/NotificationType";
import PostNotification from "../domain/PostNotification";

export default class NotificationFactory {
  public create(postId: string, to: string, from: string, type: NotificationType): PostNotification {
    return {
      id: UUIDGenerator.generate(),
      postId: postId,
      to: to,
      from: from,
      type: type
    };
  }
}
