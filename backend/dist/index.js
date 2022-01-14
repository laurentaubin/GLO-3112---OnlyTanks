const express = require("express");
const app = express();
const port = 8080;
app.get("/", (_res, res) => {
    res.send("Hello world!");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map