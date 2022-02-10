import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { status } from "../../api/Status";
import { authService } from "../../AppContext";
import { UserRequest } from "../../user/service/UserRequest";
import { isUnusedEmail } from "./validators/isUnusedEmail";
import { isUnusedUsername } from "./validators/isUnusedUsername";
import LoginRequest from "../service/LoginRequest";
import LoginRequestAssembler from "./LoginRequestAssembler";
import LoginRequestDto from "./dto/LoginRequestDto";
import UserNotFoundException from "../../user/domain/exceptions/UserNotFoundException";
import { constants } from "../../constants/constants";

const loginRequestAssembler = new LoginRequestAssembler();

const router = express.Router();

router.post(
  "/signup",
  body("username").exists().withMessage("The username field is required").custom(isUnusedUsername),
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

const handleLoginError = (error: { name: string; message: string }, res: Response) => {
  if (error instanceof UserNotFoundException) {
    return res.status(202).json({ error: { name: error.name, message: error.message } });
  }
  return res.status(500).json({ error: { name: error.name, message: error.message } });
};

module.exports = router;
