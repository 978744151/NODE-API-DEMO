//引入模型
const asyncHandler = require("../middleware/async.js");
const ErrorResponse = require("../utils/errorResponse")
const shop = require("../models/shop.js");
const platform = require("../models/platform.js");

exports.getList = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


exports.addShops = asyncHandler(async (req, res, next) => {

  if (!req.body.id) {
    return next( new ErrorResponse(`请选择平台`, 200))
  }
  if (!req.body.shop) {
    return next( new ErrorResponse(`请输入数字藏品名称`, 200))
  }
  console.log(req.body)
  const shops = await shop.create(req.body)
  res
    .status(200)
    .json({ success: true, data: shops });
});



exports.delShops = asyncHandler(async (req, res, next) => {

  const shops = await shop.findById(req.query.id)
  shops.remove()
  res
    .status(200)
    .json({ success: true, data: {} });
 });