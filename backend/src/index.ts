const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helloWorldRouter = require("./hello-world/api/helloWorld");

import { getConfigForEnvironment } from "./config";

const config = getConfigForEnvironment();

mongoose.connect(`${config.mongo.connectionString}/${config.mongo.databaseName}?retryWrites=true&w=majority`);

app.use(cors());

app.use("/hello-world", helloWorldRouter);

app.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});
