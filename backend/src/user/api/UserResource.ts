import { uploadProfilePictureRequestAssembler, userService } from "../../AppContext";
import { status } from "../../api/Status";
import express, { Response, Request } from "express";
import UploadProfilePictureRequest from "./UploadProfilePictureRequest";
import UploadProfilePictureRequestBody from "./UploadProfilePictureRequestBody";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/user/:username", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const username = req.params.username as string;
    const userResponse = await userService.findByUsername(username);
    res.status(status.OK).send(userResponse);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

router.post(
  "/user/uploadProfilePicture",
  upload.single("image"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
    try {
      const uploadProfilePictureRequest: UploadProfilePictureRequestBody =
        uploadProfilePictureRequestAssembler.assembleUploadProfilePictureRequestBody(req as UploadProfilePictureRequest);

      await userService.uploadProfilePicture(uploadProfilePictureRequest);
      res.status(status.OK).send();
    } catch (e) {
      res.status(status.BAD_REQUEST).send(e.message);
    }
  }
);

module.exports = router;
