const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("✅ Server is running on http://localhost");
});
