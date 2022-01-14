import express, { Request, Response } from "express";
import HelloWorldModel from "../infra/HelloWorldModel";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const helloWorld = await HelloWorldModel.findOne({});
  console.log({ helloWorld });
  res.status(200).send(helloWorld?.text);
});

module.exports = router;
