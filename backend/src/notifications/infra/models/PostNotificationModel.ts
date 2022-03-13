import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "notifications", timestamps: { createdAt: true, updatedAt: false } } })
export class PostNotificationDto {
  @prop({ type: String, required: true })
  public postId: string;

  @prop({ items: String, required: true })
  public to: string;

  @prop({ type: String, required: true })
  public from: string;

  @prop({ type: String, required: true })
  public type: string;

  @prop({ type: Number })
  public createdAt: number;
}

const PostNotificationModel = getModelForClass(PostNotificationDto);

export default PostNotificationModel;
