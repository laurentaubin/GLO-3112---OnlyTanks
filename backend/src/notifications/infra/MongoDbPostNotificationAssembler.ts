import PostNotification from "../domain/PostNotification";
import PostNotificationModel from "./models/PostNotificationModel";

class MongoDbPostNotificationAssembler {
  public assemblePostNotificationModel(notification: PostNotification) {
    return new PostNotificationModel({
      postId: notification.postId,
      to: notification.to,
      from: notification.from,
      type: notification.type
    });
  }
}

export default MongoDbPostNotificationAssembler;
