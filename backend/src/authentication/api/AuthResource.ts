import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { status } from "../../api/Status";
import { authService, logger } from "../../AppContext";
import { constants } from "../../constants/constants";
import MissingAuthProviderHeaderException from "../../middleware/exceptions/MissingAuthProviderHeaderException";
import MissingTokenHeaderException from "../../middleware/exceptions/MissingTokenHeaderException";
import UserNotFoundException from "../../user/domain/exceptions/UserNotFoundException";
import SessionNotFoundException from "../domain/exceptions/SessionNotFoundException";
import LoginRequest from "../domain/LoginRequest";
import InvalidTokenException from "../infra/google/exceptions/InvalidTokenException";
import LoginRequestDto from "./dto/LoginRequestDto";
import SignupRequest from "./dto/SignupRequest";
import LoginRequestAssembler from "./LoginRequestAssembler";
import { isNotForbiddenUsername } from "./validators/isNotForbiddenUsername";
import { isUnusedEmail } from "./validators/isUnusedEmail";
import { isUnusedUsername } from "./validators/isUnusedUsername";
import { writeLimiter } from "../../api/RateLimit";

const loginRequestAssembler = new LoginRequestAssembler();

const router = express.Router();

router.post(
  "/signup",
  writeLimiter,
  body("username").exists().withMessage("The username field is required").custom(isUnusedUsername).custom(isNotForbiddenUsername),
  body("email").isEmail().withMessage("Email is not valid ").custom(isUnusedEmail),
  body("firstName").exists().withMessage("The first name field is required"),
  body("lastName").exists().withMessage("The last name field is required"),
  body("phoneNumber").isMobilePhone("any").withMessage("Phone number is not valid"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>, SignupRequest>, res: Response) => {
    logger.logRouteInfo(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(status.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const signUpResponse = await authService.signup(req.body);

    res.status(status.CREATED).setHeader("LOCATION", `/users/${signUpResponse.username}`).json(signUpResponse);
  }
);

router.post(
  "/login",
  writeLimiter,
  async (req: Request<Record<string, unknown>, Record<string, unknown>, LoginRequestDto>, res: Response) => {
    logger.logRouteInfo(req);
    const loginRequest: LoginRequest = loginRequestAssembler.assemble(req.body);
    try {
      const loginResponse = await authService.login(loginRequest);
      res.status(status.OK).json(loginResponse);
    } catch (e) {
      logger.logRouteError(req, e);
      handleLoginError(e, res);
    }
  }
);

router.get("/me", async (req: Request<Record<string, unknown>, Record<string, unknown>, unknown>, res: Response) => {
  const authProvider = req.header(constants.AUTH_PROVIDER_HEADER);
  const token = req.header(constants.AUTH_TOKEN_HEADER);

  try {
    logger.logRouteInfo(req);
    validateHeaders(authProvider, token);
    const currentUser = await authService.getCurrentUser(authProvider as string, token as string);
    res.status(status.OK).json(currentUser);
  } catch (e) {
    logger.logRouteError(req, e);
    handleMeError(e, res);
  }
});

router.delete("/:username", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    await authService.deleteUser(req.params.username as string);
    res.status(status.OK).send();
  } catch (e) {
    logger.logRouteError(req, e);
    handleDeleteAccountError(e, res);
  }
});

const handleLoginError = (error: { name: string; message: string }, res: Response) => {
  if (error instanceof UserNotFoundException) {
    return res.status(status.ACCEPTED).json({ error: { name: error.name, message: error.message } });
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: { name: error.name, message: error.message } });
};

const handleMeError = (error: { name: string; message: string }, res: Response) => {
  if (
    error instanceof InvalidTokenException ||
    error instanceof SessionNotFoundException ||
    error instanceof MissingAuthProviderHeaderException ||
    error instanceof MissingTokenHeaderException
  ) {
    return res.status(status.NOT_FOUND).send();
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: { name: error.name, message: error.message } });
};

const handleDeleteAccountError = (error: { name: string; message: string }, res: Response) => {
  if (error instanceof UserNotFoundException || error instanceof SessionNotFoundException) {
    return res.status(status.NOT_FOUND).json({ error: { name: error.name, message: error.message } });
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: { name: error.name, message: error.message } });
};

const validateHeaders = (authProviderHeader: string | undefined, tokenHeader: string | undefined): void => {
  if (!authProviderHeader) {
    throw new MissingAuthProviderHeaderException();
  }
  if (!tokenHeader) {
    throw new MissingTokenHeaderException();
  }
};

module.exports = router;
