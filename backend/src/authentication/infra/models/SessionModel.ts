import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "sessions" } })
export class SessionDto {
  @prop({ type: String, required: true })
  public username: string;

  @prop({ type: String, required: true })
  public token: string;

  @prop({ type: Date, expires: 3600, default: Date.now })
  public createdAt: Date;
}

const SessionModel = getModelForClass(SessionDto);

export default SessionModel;
