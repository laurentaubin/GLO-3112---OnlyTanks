import { logger, paginationFactory, uploadProfilePictureRequestAssembler, userRequestAssembler, userService } from "../../AppContext";
import { status } from "../../api/Status";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { isUnusedEmail } from "./validators/isUnusedEmail";
import UserDto from "./dto/UserDto";
import UserRequest from "../service/UserRequest";
import { handleUpdateUserInformationException } from "./ExceptionHandler";
import UploadProfilePictureRequest from "./UploadProfilePictureRequest";
import UploadProfilePictureRequestBody from "./UploadProfilePictureRequestBody";
import { writeLimiter } from "../../api/RateLimit";
import Pagination from "../../utils/pagination/Pagination";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/users", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const users = await userService.findByPartialUsername(req.query.partialUsername as string);
    res.status(status.OK).json(users);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

router.get("/user/:username", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const username = req.params.username as string;
    const userResponse = await userService.findByUsername(username);
    res.status(status.OK).send(userResponse);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

router.put(
  "/user/:username",
  writeLimiter,
  body("email").isEmail().withMessage("Email is not valid ").custom(isUnusedEmail),
  body("firstName").exists().withMessage("The first name field is required"),
  body("lastName").exists().withMessage("The last name field is required"),
  body("phoneNumber").isMobilePhone("any").withMessage("Phone number is not valid"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>, UserDto>, res: Response) => {
    logger.logRouteInfo(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(status.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      const userRequest: UserRequest = userRequestAssembler.assembleUserRequest(req.body);
      const userResponse = await userService.updateUserInformation(userRequest);
      return res.status(status.OK).json(userResponse);
    } catch (e) {
      logger.logRouteError(req, e);
      return handleUpdateUserInformationException(e, res);
    }
  }
);

router.post(
  "/user/uploadProfilePicture",
  writeLimiter,
  upload.single("image"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
    try {
      logger.logRouteInfo(req);
      const uploadProfilePictureRequest: UploadProfilePictureRequestBody =
        uploadProfilePictureRequestAssembler.assembleUploadProfilePictureRequestBody(req as UploadProfilePictureRequest);

      const userResponse = await userService.uploadProfilePicture(uploadProfilePictureRequest);
      res.status(status.OK).send(userResponse);
    } catch (e) {
      logger.logRouteError(req, e);
      res.status(status.BAD_REQUEST).send(e.message);
    }
  }
);

router.get("/users/suggestions", writeLimiter, async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
    const popularUsers = await userService.getPopularUserPreviews(pagination);
    return res.status(status.OK).send(popularUsers);
  } catch (e) {
    logger.logRouteError(req, e);
    return handleUpdateUserInformationException(e, res);
  }
});

module.exports = router;
