import { userService } from "../../AppContext";
import { status } from "../../api/Status";
import express, { Response, Request } from "express";

const router = express.Router();

router.get("/search/users", async (_: Request<Record<string, unknown>, Record<string, unknown>>, res: Response) => {
  try {
    const multipleUsersResponse = await userService.findAll();
    res.status(status.OK).send(multipleUsersResponse);
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
