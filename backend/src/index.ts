import { getConfigForEnvironment } from "./config";
import { authMiddleware } from "./middleware/AuthMiddleware";
import { app, notificationIssuer } from "./AppContext";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const healthResource = require("./api/HealthResource");
const userResource = require("./user/api/UserResource");
const authResource = require("./authentication/api/AuthResource");
const postResource = require("./post/api/PostResource");
const notificationResource = require("./notifications/api/NotificationResource");
const googlePhotoResource = require("./google-photos/api/GooglePhotoResource");

const config = getConfigForEnvironment();

mongoose.connect(`${config.mongo.connectionString}/${config.mongo.databaseName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(express.json());
app.use(cors());

app.use(authMiddleware);

app.use("/", healthResource);
app.use("/", authResource);
app.use("/", userResource);
app.use("/", postResource);
app.use("/", googlePhotoResource);
app.use("/notifications", notificationResource);

notificationIssuer.listen();
