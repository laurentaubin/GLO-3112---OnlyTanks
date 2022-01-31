import { CustomValidator } from "express-validator";
import UserModel from "../../../user/infra/models/UserModel";

export const isUnusedEmail: CustomValidator = async (value: string): Promise<string | void> => {
  const usersWithEmail = await UserModel.find({ email: value });
  if (usersWithEmail.length >= 1) {
    return Promise.reject("Email is already in use");
  }

  return Promise.resolve();
};
