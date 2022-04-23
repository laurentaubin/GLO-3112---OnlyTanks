import PostNotificationRepository from "../domain/PostNotificationRepository";
import PostNotification from "../domain/PostNotification";
import NotificationIssuer from "../domain/NotificationIssuer";
import NotificationResponse from "../api/NotificationResponse";
import SessionRepository from "src/authentication/domain/SessionRepository";

class NotificationService {
  constructor(
    private postNotificationRepository: PostNotificationRepository,
    private notificationIssuer: NotificationIssuer,
    private sessionRepository: SessionRepository
  ) {}

  public async getNotifications(token: string): Promise<NotificationResponse[]> {
    const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });

    return await this.postNotificationRepository.findAllByUsername(requesterUsername);
  }

  public sendPostNotification(notification: PostNotification): void {
    if (notification.from === notification.to) return;

    this.postNotificationRepository.save(notification);
    this.notificationIssuer.issue(notification);
  }
}

export default NotificationService;
