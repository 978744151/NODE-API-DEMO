const mongoose = require("mongoose");
const moment = require('moment');
const platform = new mongoose.Schema({

 platform: {
  type: String,
  required: [true, "请添加平台"],
 },
 createdAt: {
  type: String,
  default: moment().format("YYYY-MM-DD HH:mm:ss"),
 },
});

module.exports = mongoose.model("platform", platform);

