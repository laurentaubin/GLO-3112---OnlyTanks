import PostNotificationRepository from "../domain/PostNotificationRepository";
import PostNotification from "../domain/PostNotification";

class NotificationService {
  constructor(private notificationRepository: PostNotificationRepository) {}

  public sendPostNotification(notification: PostNotification): void {
    this.notificationRepository.save(notification);
    // TODO notifIssuer.issue
  }
}

export default NotificationService;
