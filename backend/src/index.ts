import { getConfigForEnvironment } from "./config";
import { authMiddleware } from "./middleware/AuthMiddleware";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const healthResource = require("./api/HealthResource");
const userResource = require("./user/api/UserResource");
const authResource = require("./authentication/api/AuthResource");
const postResource = require("./post/api/PostResource");

import { limiter } from "./api/RateLimit";

const app = express();
const config = getConfigForEnvironment();

mongoose.connect(`${config.mongo.connectionString}/${config.mongo.databaseName}?retryWrites=true&w=majority`);

app.use(limiter);
app.use(express.json());
app.use(cors());

app.use(authMiddleware);

app.use("/", healthResource);
app.use("/", authResource);
app.use("/", userResource);
app.use("/", postResource);

app.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});
