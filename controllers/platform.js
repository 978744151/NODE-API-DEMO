//引入模型
const asyncHandler = require("../middleware/async.js");
const ErrorResponse = require("../utils/errorResponse")
const platform = require("../models/platform.js");
const moment = require('moment');
exports.getList = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.addPlatform = asyncHandler(async (req, res, next) => {
  const publishedMscamp = await platform.findOne({ platform: req.body.platform });
  if (!req.body.platform) {
    return next(new ErrorResponse('请输入平台',200));
  }
  if (publishedMscamp) {
    return next(new ErrorResponse('该平台已存在',200));
  }
 const platforms = await platform.create(req.body)
 res
   .status(200)
   .json({ success: true, data: platforms });
});


exports.upDatePlatform = asyncHandler(async (req, res, next) => {
 
  const platforms = await platform.findByIdAndUpdate(req.query._id, { ...req.query , createdAt:moment().format("YYYY-MM-DD HH:mm:ss")}, {
      new: true,
      runValidators: true,
     
    })
    res
      .status(200)
      .json({ success: true, data: platforms });
 });

exports.delPlatform = asyncHandler(async (req, res, next) => {

  console.log(req.query)
  const platforms = await platform.findById(req.query.id)
  platforms.remove()
  res
    .status(200)
    .json({ success: true, data: {} });
 });