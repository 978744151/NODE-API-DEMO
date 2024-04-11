//引入模型
const asyncHandler = require("../middleware/async.js");
const ErrorResponse = require("../utils/errorResponse")
const census = require("../models/census.js");
const express = require("express")
const router = express.Router()



exports.getCensus = asyncHandler(async (req, res, next) => {

  let query;
  const reqQuery = { ...req.query };

  const removeFileds = ['select', 'sort', 'page', 'size'];

  removeFileds.forEach((params) => delete reqQuery[params])
  
  let queryStr = JSON.stringify(reqQuery)
  
  query = census.find(JSON.parse(queryStr))

  const page = parseInt(req.query.page, 10) || 1
  const size = parseInt(req.query.size, 10) || 10
  const total = await census.countDocuments();
  const startIndex = (page - 1) * size;
  query.skip(startIndex).limit(size)
  const censuss = await query
  
 res.status(200).json({ success: true,total,size,page, count: censuss.length, mes: censuss });
});

exports.addCensus = asyncHandler(async (req, res, next) => {
 const censuss = await census.create(req.body)
 res
   .status(200)
   .json({ success: true, data: censuss });
});

exports.delCensus = asyncHandler(async (req, res, next) => {

  console.log(req.query)
  const censuss = await census.findById(req.query.id)
  censuss.remove()
  res
    .status(200)
    .json({ success: true, data: {} });
 });