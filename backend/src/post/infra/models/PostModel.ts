import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "posts", timestamps: true } })
export class PostDto {
  @prop({ type: String, required: true })
  public author: string;

  @prop({ items: String, required: true })
  public imageUrl: string;

  @prop({ type: [String], required: true })
  public hashtags: string[];

  @prop({ type: String, required: true })
  public caption: string;

  @prop({ type: String, required: true })
  public id: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const PostModel = getModelForClass(PostDto);

export default PostModel;
