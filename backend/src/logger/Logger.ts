import { Request } from "express";

const cloudWatchLogger = require("./CloudWatchLogger");

class Logger {
  public logRouteInfo(req: Request<Record<string, unknown>, Record<string, unknown>>) {
    cloudWatchLogger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      body: req.body,
      headers: req.headers
    });
  }

  public logRouteError(req: Request<Record<string, unknown>, Record<string, unknown>>, error: any) {
    cloudWatchLogger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      error: error
    });
  }
}

export default Logger;
