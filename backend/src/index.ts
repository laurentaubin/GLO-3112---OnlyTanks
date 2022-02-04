import { getConfigForEnvironment } from "./config";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userResource = require("./user/api/UserResource");
const authResource = require("./authentication/api/AuthResource");

const app = express();
const config = getConfigForEnvironment();

mongoose.connect(`${config.mongo.connectionString}/${config.mongo.databaseName}?retryWrites=true&w=majority`);

app.use(express.json());
app.use(cors());

app.use("/", authResource);
app.use("/", userResource);

app.listen(config.http.port, () => {
  console.log(`server started at http://localhost:${config.http.port}`);
});
