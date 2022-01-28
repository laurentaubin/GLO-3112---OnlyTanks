const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helloWorldRouter = require("./hello-world/api/helloWorld");
const userRouter = require("./user/api/UserResource");

import { getConfigForEnvironment } from "./config";

const config = getConfigForEnvironment();

mongoose.connect(`${config.mongo.connectionString}/${config.mongo.databaseName}?retryWrites=true&w=majority`);

app.use(express.json());
app.use(cors());

app.use("/hello-world", helloWorldRouter);
app.use("/", userRouter);

app.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});
