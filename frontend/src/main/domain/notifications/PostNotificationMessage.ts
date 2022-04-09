interface PostNotificationMessage {
  postId: string;
  to: string;
  from: string;
  type: string;
  timestamp: Date;
}

export default PostNotificationMessage;
