import { CustomValidator } from "express-validator";
import UserModel from "../../../user/infra/models/UserModel";

export const isUnusedUsername: CustomValidator = async (value: string): Promise<string | void> => {
  const usersWithEmail = await UserModel.find({ username: value });
  if (usersWithEmail.length >= 1) {
    return Promise.reject("Username already exists");
  }

  return Promise.resolve();
};
