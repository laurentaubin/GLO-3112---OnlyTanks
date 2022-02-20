import { status } from "../../api/Status";
import { Response } from "express";
import UserNotFoundException from "../domain/exceptions/UserNotFoundException";

export const handleUpdateUserInformationException = (error: { name: string; message: string }, res: Response) => {
  if (error instanceof UserNotFoundException) {
    return res.status(status.NOT_FOUND).json({ error: { name: error.name, message: error.message } });
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: { name: error.name, message: error.message } });
};
