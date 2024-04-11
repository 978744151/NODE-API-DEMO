const mongoose = require("mongoose");
const moment = require('moment');
const shops = new mongoose.Schema({

 platform: {
  type: String,
  required: [true, "请选择平台"],
 },
 shop: {
  type: String,
  required: [true, "请添加商品"],
 },
 createdAt: {
  type: String,
  default: moment().format("YYYY-MM-DD HH:mm:ss"),
 },
});

module.exports = mongoose.model("shops", shops);

                   