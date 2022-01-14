const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helloWorldRouter = require("./helloWorld/api/helloWorld");

const DEFAULT_PORT = 8080;

mongoose.connect("mongodb://tankstagram-mongo:27017/tankstagram");

app.use(cors());

app.use("/hello-world", helloWorldRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`server started at http://localhost:${DEFAULT_PORT}`);
});
