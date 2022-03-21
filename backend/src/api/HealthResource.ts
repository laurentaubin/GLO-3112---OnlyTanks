import express, { Request, Response } from "express";
import { logger } from "../AppContext";

const router = express.Router();

router.get("/", (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  logger.logRouteInfo(req);
  res.send("Healthy");
});

module.exports = router;
