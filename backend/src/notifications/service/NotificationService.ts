import PostNotificationRepository from "../domain/PostNotificationRepository";
import PostNotification from "../domain/PostNotification";
import NotificationIssuer from "../domain/NotificationIssuer";

class NotificationService {
  constructor(private notificationRepository: PostNotificationRepository, private notificationIssuer: NotificationIssuer) {}

  public sendPostNotification(notification: PostNotification): void {
    if (notification.from === notification.to) return;

    this.notificationRepository.save(notification);
    this.notificationIssuer.issue(notification);
  }
}

export default NotificationService;
