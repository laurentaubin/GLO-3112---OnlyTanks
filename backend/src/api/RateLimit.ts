import rateLimit from "express-rate-limit";
import { status } from "./Status";

export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_request, response) =>
    response.status(status.TOO_MANY_REQUEST).json({
      error: "You sent too many requests. Please wait a while then try again."
    })
});
