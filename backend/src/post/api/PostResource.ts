import { status } from "../../api/Status";
import express, { Request, Response } from "express";
import { logger, paginationFactory, postRequestAssembler, postService } from "../../AppContext";
import PostRequest from "./PostRequest";
import PostRequestBody from "./PostRequestBody";
import Pagination from "../../utils/pagination/Pagination";
import EditPostFieldsRequest from "./EditPostFieldsRequest";
import { constants } from "../../constants/constants";
import { writeLimiter } from "../../api/RateLimit";
import PostCommentRequest from "./PostCommentRequest";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/posts",
  writeLimiter,
  upload.single("image"),
  async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
    try {
      logger.logRouteInfo(req);
      const postRequestBody: PostRequestBody = postRequestAssembler.assemblePostRequestBody(req as PostRequest);
      await postService.addPost(postRequestBody);
      res.status(status.CREATED).send();
    } catch (e) {
      logger.logRouteError(req, e);
      res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
);

router.get("/feed", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  logger.logRouteInfo(req);
  const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
  const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
  getPosts(token, res, pagination);
});

router.get("/posts", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  logger.logRouteInfo(req);
  const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
  const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
  getAuthorPosts(token as string, req.query.author as string, res, pagination);
});

router.delete("/posts/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    await postService.deletePost(req.params.id as string);
    res.send(status.ACCEPTED).send();
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.NOT_FOUND).send(e.message);
  }
});

router.get("/posts/:id", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postsResponse = await postService.getPost(token as string, req.params.id as string);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.put("/posts/:id", writeLimiter, async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const updatedPostResponse = await postService.editPost(token as string, req.params.id as string, req.body as EditPostFieldsRequest);
    res.status(status.OK).send(updatedPostResponse);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post("/posts/:id/like", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.likePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.post(
  "/posts/:id/comment",
  async (req: Request<Record<string, unknown>, Record<string, unknown>, PostCommentRequest>, res: Response) => {
    try {
      logger.logRouteInfo(req);
      const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
      const postId = req.params.id as string;
      const postCommentRequest = req.body;
      const post = await postService.commentPost(token, postId, postCommentRequest);
      res.status(status.OK).send(post);
    } catch (e) {
      logger.logRouteError(req, e);
      res.status(status.BAD_REQUEST).send(e.message);
    }
  }
);

router.post("/posts/:id/unlike", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const postId = req.params.id as string;
    await postService.unlikePost(token, postId);
    res.status(status.OK).send();
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/search/posts", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const caption = req.query.caption as string;
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
    const postsResponse = await postService.findPostsByCaption(token, caption, pagination);
    res.status(status.OK).send(postsResponse);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/search/posts/hashtags", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
    const pagination: Pagination = paginationFactory.create(req.query.limit as string, req.query.skip as string);
    const posts = await postService.findPostsByHashtags(token, req.query.hashtags as string[], pagination);

    res.status(status.OK).send(posts);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/posts/:id/likes", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const postId = req.params.id as string;
    const userPreviews = await postService.getPostLikes(postId);
    res.status(status.OK).send({ likedBy: userPreviews, count: userPreviews.length });
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.BAD_REQUEST).send(e.message);
  }
});

router.get("/posts/:id/comments", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    logger.logRouteInfo(req);
    const postId = req.params.id as string;
    const comments = await postService.getPostComments(postId);
    res.status(status.OK).send({ comments: comments, count: comments.length });
  } catch (e) {
    logger.logRouteError(req, e);
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
