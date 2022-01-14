const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helloWorldRouter = require("./helloWorld/api/helloWorld");

import { getConfigForEnvironment } from "./config";

const config = getConfigForEnvironment(process.env.NODE_ENV || "local");

mongoose.connect(`mongodb://${config.mongo.address}:${config.mongo.port}/${config.mongo.databaseName}`);

app.use(cors());

app.use("/hello-world", helloWorldRouter);

app.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});
