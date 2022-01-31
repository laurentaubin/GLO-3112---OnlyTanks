import { userService } from "../../AppContext";
import { status } from "../../api/status";
import express, { Response, Request } from "express";

const router = express.Router();

router.get("/user/:username", async (req: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const username = req.params.username as string;
    const user = await userService.findByUsername(username);
    res.status(status.OK).send(user);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e.message);
  }
});

module.exports = router;
