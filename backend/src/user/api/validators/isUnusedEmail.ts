import { CustomValidator } from "express-validator";
import UserModel, { UserDto } from "../../../user/infra/models/UserModel";

export const isUnusedEmail: CustomValidator = async (value: string, { req }): Promise<string | void> => {
  const userWithEmail = (await UserModel.findOne({ email: value })) as unknown as UserDto;
  if (userWithEmail && userWithEmail.username !== req.params?.username) {
    return Promise.reject("Email is already in use");
  }

  return Promise.resolve();
};
