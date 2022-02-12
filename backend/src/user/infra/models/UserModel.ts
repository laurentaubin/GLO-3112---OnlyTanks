import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: { createdAt: true, updatedAt: false } } })
export class UserDto {
  @prop({ type: String, required: true })
  public username: string;

  @prop({ type: String, required: true })
  public email: string;

  @prop({ type: String, required: true })
  public firstName: string;

  @prop({ type: String, required: true })
  public lastName: string;

  @prop({ type: String, required: true })
  public phoneNumber: string;

  @prop({ type: Number })
  public createdAt: number;

  public updatedAt?: number;
}

const UserModel = getModelForClass(UserDto);

export default UserModel;
