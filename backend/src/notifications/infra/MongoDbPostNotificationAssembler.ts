import dayjs from "dayjs";
import NotificationType from "../domain/NotificationType";
import PostNotification from "../domain/PostNotification";
import PostNotificationModel, { PostNotificationDto } from "./models/PostNotificationModel";

class MongoDbPostNotificationAssembler {
  public assemblePostNotification(notificationDto: PostNotificationDto): PostNotification {
    return {
      id: notificationDto.id,
      postId: notificationDto.postId,
      to: notificationDto.to,
      from: notificationDto.from,
      type: NotificationType[notificationDto.type as keyof typeof NotificationType],
      timestamp: dayjs(notificationDto.createdAt).toDate()
    };
  }

  public assemblePostNotificationModel(notification: PostNotification) {
    return new PostNotificationModel({
      id: notification.id,
      postId: notification.postId,
      to: notification.to,
      from: notification.from,
      type: notification.type
    });
  }
}

export default MongoDbPostNotificationAssembler;
