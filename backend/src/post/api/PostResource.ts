import { status } from "../../api/Status";
import express, { Request, Response } from "express";
import { paginationFactory, postRequestAssembler, postService } from "../../AppContext";
import PostRequest from "./PostRequest";
import PostRequestBody from "./PostRequestBody";
import Pagination from "../../utils/pagination/Pagination";
import EditPostFieldsRequest from "./EditPostFieldsRequest";
import { constants } from "../../constants/constants";
import { writeLimiter } from "../../api/RateLimit";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/posts",
  writeLimiter,
  upload.single("image"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
    try {
      const postRequestBody: PostRequestBody = postRequestAssembler.assemblePostRequestBody(req as PostRequest);

      await postService.addPost(postRequestBody);

      res.status(status.CREATED).send();
    } catch (e) {
      res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
);

router.get("/feed", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
  const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
  if (req.query.author) {
    return await getAuthorPosts(token as string, req.query.author as string, res, pagination);
  }
  return await getPosts(token, res, pagination);
});

router.delete("/posts/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    await postService.deletePost(req.params.id as string);

    res.send(status.ACCEPTED).send();
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

router.get("/posts/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postsResponse = await postService.getPost(token as string, req.params.id as string);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.put("/posts/:id", writeLimiter, async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const updatedPostResponse = await postService.editPost(token as string, req.params.id as string, req.body as EditPostFieldsRequest);
    res.status(status.OK).send(updatedPostResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post("/posts/:id/like", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.likePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post("/posts/:id/unlike", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.unlikePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/posts", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const caption = req.query.caption as string;
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
    const postsResponse = await postService.findPostsByCaption(token, caption, pagination);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/post/hashtags", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
    const posts = await postService.findPostsByHashtags(token, req.query.hashtags as string[], pagination);

    res.status(status.OK).send(posts);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/:id/likes", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const postId = req.params.id as string;
    const userPreviews = await postService.getPostLikes(postId);
    res.status(status.OK).send({ likedBy: userPreviews, count: userPreviews.length });
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

const getAuthorPosts = async (token: string, author: string, res: Response, pagination: Pagination) => {
  try {
    const posts = await postService.getAuthorPosts(token, author, pagination);
    res.status(status.OK).send(posts);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
};

const getPosts = async (token: string, res: Response, pagination: Pagination) => {
  try {
    const postsResponse = await postService.getPosts(token, pagination);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e.message);
  }
};

module.exports = router;
