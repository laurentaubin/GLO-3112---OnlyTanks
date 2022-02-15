import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (_: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  res.send("Healthy");
});

module.exports = router;
