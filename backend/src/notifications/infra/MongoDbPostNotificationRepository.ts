import PostNotification from "../domain/PostNotification";
import PostNotificationRepository from "../domain/PostNotificationRepository";
import PostNotificationModel, { PostNotificationDto } from "./models/PostNotificationModel";
import MongoDbPostNotificationAssembler from "./MongoDbPostNotificationAssembler";

class MongoDbPostNotificationRepository implements PostNotificationRepository {
  constructor(private assembler: MongoDbPostNotificationAssembler) {}

  public async findAllByUsername(username: string): Promise<PostNotification[]> {
    const postNotificationDtos = (await PostNotificationModel.find({ to: username }).lean()) as unknown as PostNotificationDto[];
    return postNotificationDtos.map(this.assembler.assemblePostNotification);
  }

  public async save(postNotification: PostNotification): Promise<void> {
    const notificationModel = this.assembler.assemblePostNotificationModel(postNotification);
    await notificationModel.save();
  }
}

export default MongoDbPostNotificationRepository;
