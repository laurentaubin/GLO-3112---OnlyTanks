import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

const TWO_WEEKS_IN_SECOND = 60 * 60 * 24 * 14;

@modelOptions({ schemaOptions: { collection: "notifications", timestamps: { createdAt: true, updatedAt: false } } })
export class PostNotificationDto {
  @prop({ type: String, required: true })
  public id: string;

  @prop({ type: String, required: true })
  public postId: string;

  @prop({ items: String, required: true })
  public to: string;

  @prop({ type: String, required: true })
  public from: string;

  @prop({ type: String, required: true })
  public type: string;

  @prop({ type: Number, expires: TWO_WEEKS_IN_SECOND, default: Date.now })
  public createdAt: number;
}

const PostNotificationModel = getModelForClass(PostNotificationDto);

export default PostNotificationModel;
