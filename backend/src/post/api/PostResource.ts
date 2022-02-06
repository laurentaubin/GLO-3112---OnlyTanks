import { status } from "../../api/Status";
import express, { Response, Request } from "express";
import { postAssemblerRequest, postService } from "../../AppContext";
import PostRequest from "./PostRequest";
import PostBody from "./PostBody";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/post", upload.single("image"), async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const postRequest: PostBody = postAssemblerRequest.postRequestToPostApi(req as PostRequest);

    postService.addPost(postRequest);

    res.status(status.OK).send(postRequest);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

module.exports = router;
