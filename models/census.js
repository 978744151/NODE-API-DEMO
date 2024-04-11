const mongoose = require("mongoose");
const moment = require('moment');
const census = new mongoose.Schema({

 time: {
  type: String,
  required: [true, "请选择日期"],
 },
 shop: {
  type: String,
  required: [true, "请选择商品"],
 },
 platform: {
  type: String,
  required: [true, "请选择平台"],
 },
 price: {
  type: Number,
  required: [true, "请填写今日价格"],
 },
 createdAt: {
  type: String,
  default: moment().format("YYYY-MM-DD HH:mm:ss"),
 },
});

module.exports = mongoose.model("census", census);

