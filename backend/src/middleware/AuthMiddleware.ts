import { Request, Response } from "express";
import { authService } from "../AppContext";
import { constants } from "../constants/constants";
import InvalidTokenException from "../authentication/infra/google/exceptions/InvalidTokenException";
import MissingAuthProviderHeaderException from "./exceptions/MissingAuthProviderHeaderException";
import MissingTokenHeaderException from "./exceptions/MissingTokenHeaderException";
import { status } from "../api/Status";
import SessionNotFoundException from "../authentication/domain/exceptions/SessionNotFoundException";

export const authMiddleware = async (req: Request<Record<string, unknown>, Record<string, unknown>, any>, res: Response, next: any) => {
  const allowedRoutes = ["/", "/login", "/signup"];
  if (allowedRoutes.includes(req.path)) next();
  else {
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
      }
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
