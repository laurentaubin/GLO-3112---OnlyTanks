import { CustomValidator } from "express-validator";

const FORBIDDEN_USERNAMES = ["notifications", "messages", "create", "signup"];

export const isNotForbiddenUsername: CustomValidator = async (value: string): Promise<string | void> => {
  if (FORBIDDEN_USERNAMES.includes(value)) {
    return Promise.reject("Invalid username");
  }

  return Promise.resolve();
};
