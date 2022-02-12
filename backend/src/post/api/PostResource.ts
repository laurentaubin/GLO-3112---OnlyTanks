import { status } from "../../api/Status";
import express, { Response, Request } from "express";
import { postRequestAssembler, postService, paginationFactory } from "../../AppContext";
import PostRequest from "./PostRequest";
import PostBody from "./PostBody";
import Pagination from "../../utils/pagination/Pagination";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/post", upload.single("image"), async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const postRequest: PostBody = postRequestAssembler.assemblePostBody(req as PostRequest);

    postService.addPost(postRequest);

    res.status(status.OK).send();
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/post/:author", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
  try {
    const posts = await postService.getAuthorPosts(req.params.author as string, pagination);

    res.status(status.OK).send(posts);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

module.exports = router;
