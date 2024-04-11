const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config_pro.env",
});
const app = express();

app.get("/", (req, res) => {
  res.send("大家好,欢迎来到米修在线");
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
