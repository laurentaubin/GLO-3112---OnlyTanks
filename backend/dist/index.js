const express = require("express");
const app = express();
const cors = require("cors");
const DEFAULT_PORT = 8080;
app.use(cors());
app.get("/", (_res, res) => {
    res.send("Hello world!");
});
app.listen(DEFAULT_PORT, () => {
    console.log(`server started at http://localhost:${DEFAULT_PORT}`);
});
//# sourceMappingURL=index.js.map