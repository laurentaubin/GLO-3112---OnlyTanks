import { Request, Response } from "express";
import { authService } from "../AppContext";
import { constants } from "../constants/constants";
import InvalidTokenException from "../authentication/infra/google/exceptions/InvalidTokenException";
import MissingAuthProviderHeaderException from "./exceptions/MissingAuthProviderHeaderException";
import MissingTokenHeaderException from "./exceptions/MissingTokenHeaderException";
import { status } from "../api/Status";
import SessionNotFoundException from "../authentication/domain/exceptions/SessionNotFoundException";
import InvalidProviderEception from "../authentication/domain/exceptions/InvalidProviderException";

export const authMiddleware = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, unknown>,
  res: Response,
  next: () => void
) => {
  const forbiddenRoutes: string[] = [];
  if (!forbiddenRoutes.includes(req.path)) {
    next();
    return;
  }

  try {
    const authProvider = req.header(constants.AUTH_PROVIDER_HEADER);
    const token = req.header(constants.AUTH_TOKEN_HEADER);
    validateHeaders(authProvider, token);
    await authService.validateToken(authProvider as string, token as string);
    next();
  } catch (e) {
    if (
      e instanceof InvalidTokenException ||
      e instanceof SessionNotFoundException ||
      e instanceof MissingAuthProviderHeaderException ||
      e instanceof MissingTokenHeaderException
    ) {
      res.status(status.UNAUTHORIZED).json({ name: e.name, message: e.message });
    } else if (e instanceof InvalidProviderEception) {
      res.status(status.BAD_REQUEST).json({ name: e.name, message: e.message });
    }
  }
};

const validateHeaders = (authProviderHeader: string | undefined, tokenHeader: string | undefined): void => {
  if (!authProviderHeader) {
    throw new MissingAuthProviderHeaderException();
  }
  if (!tokenHeader) {
    throw new MissingTokenHeaderException();
  }
};
