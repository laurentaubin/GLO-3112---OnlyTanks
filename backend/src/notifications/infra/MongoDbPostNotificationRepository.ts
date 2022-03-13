import PostNotification from "../domain/PostNotification";
import PostNotificationRepository from "../domain/PostNotificationRepository";
import MongoDbPostNotificationAssembler from "./MongoDbPostNotificationAssembler";

class MongoDbPostNotificationRepository implements PostNotificationRepository {
  constructor(private assembler: MongoDbPostNotificationAssembler) {}

  public async save(postNotification: PostNotification): Promise<void> {
    const notificationModel = this.assembler.assemblePostNotificationModel(postNotification);
    await notificationModel.save();
  }
}

export default MongoDbPostNotificationRepository;
