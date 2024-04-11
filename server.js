const express = require("express");
const dotenv = require("dotenv");
const connectDbB = require('./config/db')
const mscamps = require("./routes/mscamps");
const course = require("./routes/course");
const auth = require("./routes/auth");
const census = require("./routes/census");
const shop = require("./routes/shop");
const platform = require("./routes/platform");
// const logger = require("./middleware/logger.js");
const morgan = require("morgan");
const errorHandler = require("./middleware/error")
dotenv.config({
  path: "./config/config.env",
});

const app = express();

//连接数据库
connectDbB()

app.use(express.json())

app.use(morgan("dev"));

app.get("", (req, res) => {
  res.status(200).json({ success: true, mes: "米修在线" });
});

app.use("/api/v1/mscamps", mscamps);
app.use("/api/v1/course", course);
app.use("/api/v1/auth", auth);
app.use("/api/v1/census", census);
app.use("/api/v1/shop", shop);
app.use("/api/v1/platform", platform);
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
