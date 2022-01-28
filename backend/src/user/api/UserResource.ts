import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import MongoDbUserRepository from "../infra/MongoUserRepository";
import InfraUserAssembler from "../infra/UserAssembler";
import AuthService from "../service/AuthService";
import ApiUserAssembler from "../service/assemblers/UserAssembler";
import { UserRequest } from "../service/dtos/UserRequest";
import { isUnusedEmail } from "./validators/isUnusedEmail";
import { isUnusedUsername } from "./validators/isUnusedUsername";

const router = express.Router();

const apiUserAssembler = new ApiUserAssembler();
const infraUserAssembler = new InfraUserAssembler();
const userRepository = new MongoDbUserRepository(infraUserAssembler);
const authService = new AuthService(apiUserAssembler, userRepository);

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
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = await authService.signup(req.body);
    return res.status(201).setHeader("LOCATION", `/users/${newUser.username}`).json(newUser);
  }
);

module.exports = router;
