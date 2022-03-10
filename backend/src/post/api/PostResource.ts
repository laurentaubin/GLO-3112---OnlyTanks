import { status } from "../../api/Status";
import express, { Request, Response } from "express";
import { paginationFactory, postRequestAssembler, postService } from "../../AppContext";
import PostRequest from "./PostRequest";
import PostRequestBody from "./PostRequestBody";
import Pagination from "../../utils/pagination/Pagination";
import EditPostFieldsRequest from "./EditPostFieldsRequest";
import { constants } from "../../constants/constants";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.single("image"), async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const postRequestBody: PostRequestBody = postRequestAssembler.assemblePostRequestBody(req as PostRequest);

    await postService.addPost(postRequestBody);

    res.status(status.CREATED).send();
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

router.get("/", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
  if (req.query.author) {
    return await getAuthorPosts(req.query.author as string, res, pagination);
  }
  return await getPosts(res, pagination);
});

router.delete("/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    await postService.deletePost(req.params.id as string);

    res.send(status.ACCEPTED).send();
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

router.get("/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const postsResponse = await postService.getPost(req.params.id as string);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.put("/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const updatedPostResponse = await postService.editPost(req.params.id as string, req.body as EditPostFieldsRequest);
    res.status(status.OK).send(updatedPostResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post("/:id/like", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.likePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post("/:id/unlike", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.unlikePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

const getAuthorPosts = async (author: string, res: Response, pagination: Pagination) => {
  try {
    const posts = await postService.getAuthorPosts(author, pagination);
    res.status(status.OK).send(posts);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
};

const getPosts = async (res: Response, pagination: Pagination) => {
  try {
    const postsResponse = await postService.getPosts(pagination);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
};

module.exports = router;
