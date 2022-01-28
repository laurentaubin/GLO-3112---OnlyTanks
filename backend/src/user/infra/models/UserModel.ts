import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
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

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(UserDto);

export default UserModel;
