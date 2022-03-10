import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

class UserTagDto {
  @prop({ type: String, required: true })
  public username: string;

  @prop({ type: [Number, Number], required: true })
  public position: [number, number];
}

@modelOptions({ schemaOptions: { collection: "posts", timestamps: { createdAt: true, updatedAt: false } } })
export class PostDto {
  @prop({ type: String, required: true })
  public author: string;

  @prop({ items: String, required: true })
  public imageUrl: string;

  @prop({ type: [String], required: true })
  public hashtags: string[];

  @prop({ type: String })
  public caption: string;

  @prop({ type: () => UserTagDto })
  public userTags: UserTagDto[];

  @prop({ type: String, required: true })
  public id: string;

  @prop({ type: [String], required: true })
  public likes: string[];

  @prop({ type: Number })
  public createdAt: number;

  public updatedAt?: number;
}

const PostModel = getModelForClass(PostDto);

export default PostModel;
