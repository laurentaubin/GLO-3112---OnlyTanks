import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { status } from "../../api/Status";
import { authService } from "../../AppContext";
import { isUnusedEmail } from "./validators/isUnusedEmail";
import { isUnusedUsername } from "./validators/isUnusedUsername";
import LoginRequest from "../domain/LoginRequest";
import LoginRequestAssembler from "./LoginRequestAssembler";
import LoginRequestDto from "./dto/LoginRequestDto";
import UserNotFoundException from "../../user/domain/exceptions/UserNotFoundException";
import { constants } from "../../constants/constants";
import UserRequest from "../../user/service/UserRequest";
import InvalidTokenException from "../infra/google/exceptions/InvalidTokenException";
import SessionNotFoundException from "../domain/exceptions/SessionNotFoundException";
import MissingAuthProviderHeaderException from "../../middleware/exceptions/MissingAuthProviderHeaderException";
import MissingTokenHeaderException from "../../middleware/exceptions/MissingTokenHeaderException";
import { isNotForbiddenUsername } from "./validators/isNotForbiddenUsername";

const loginRequestAssembler = new LoginRequestAssembler();

const router = express.Router();

router.post(
  "/signup",
  body("username").exists().withMessage("The username field is required").custom(isUnusedUsername).custom(isNotForbiddenUsername),
  body("email").isEmail().withMessage("Email is not valid ").custom(isUnusedEmail),
  body("firstName").exists().withMessage("The first name field is required"),
  body("lastName").exists().withMessage("The last name field is required"),
  body("phoneNumber").isMobilePhone("any").withMessage("Phone number is not valid"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>, UserRequest>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(status.BAD_REQUEST).json({ errors: errors.array() });
    }

    const signUpResponse = await authService.signup(req.body, req.header(constants.AUTH_PROVIDER_HEADER) as string);

    return res.status(status.CREATED).setHeader("LOCATION", `/users/${signUpResponse.username}`).json(signUpResponse);
  }
);

router.post("/login", async (req: Request<Record<string, unknown>, Record<string, unknown>, LoginRequestDto>, res: Response) => {
  const loginRequest: LoginRequest = loginRequestAssembler.assemble(req.body);
  try {
    const loginResponse = await authService.login(loginRequest);
    return res.status(status.OK).json(loginResponse);
  } catch (e) {
    return handleLoginError(e, res);
  }
});

router.get("/me", async (req: Request<Record<string, unknown>, Record<string, unknown>, unknown>, res: Response) => {
  const authProvider = req.header(constants.AUTH_PROVIDER_HEADER);
  const token = req.header(constants.AUTH_TOKEN_HEADER);

  try {
    validateHeaders(authProvider, token);
    const currentUser = await authService.getCurrentUser(authProvider as string, token as string);
    return res.json(currentUser);
  } catch (e) {
    return handleMeError(e, res);
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

const validateHeaders = (authProviderHeader: string | undefined, tokenHeader: string | undefined): void => {
  if (!authProviderHeader) {
    throw new MissingAuthProviderHeaderException();
  }
  if (!tokenHeader) {
    throw new MissingTokenHeaderException();
  }
};

module.exports = router;
