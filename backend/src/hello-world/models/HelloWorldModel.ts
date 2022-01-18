import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "helloWorld", timestamps: true } })
class HelloWorld {
  @prop({ type: String, required: true })
  public text: string;
}

const HelloWorldModel = getModelForClass(HelloWorld);

export default HelloWorldModel;
