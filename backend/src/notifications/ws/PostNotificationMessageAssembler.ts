import PostNotification from "../domain/PostNotification";
import PostNotificationMessage from "./dto/PostNotificationMessage";

class PostNotificationMessageAssembler {
  public assembleToPostNotificationMessage(postNotification: PostNotification): PostNotificationMessage {
    return {
      id: postNotification.id,
      postId: postNotification.postId,
      to: postNotification.to,
      from: postNotification.from,
      type: postNotification.type.toString(),
      timestamp: postNotification.timestamp ?? new Date()
    };
  }
}

export default PostNotificationMessageAssembler;
