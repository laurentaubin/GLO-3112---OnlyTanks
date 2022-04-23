import { status } from "../../api/Status";
import express, { Request, Response } from "express";
import { logger, notificationService } from "../../AppContext";
import { constants } from "../../constants/constants";

const router = express.Router();

router.get("/", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  logger.logRouteInfo(req);
  const token = req.header(constants.AUTH_TOKEN_HEADER) as string;
  try {
    const postNotifications = await notificationService.getNotifications(token);
    res.status(status.OK).send(postNotifications);
  } catch (e) {
    logger.logRouteError(req, e);
    res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
