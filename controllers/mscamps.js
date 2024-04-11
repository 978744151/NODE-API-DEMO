//引入模型
const asyncHandler = require("../middleware/async.js");
const ErrorResponse = require("../utils/errorResponse")
const Mscamp = require("../models/Mscamp.js");
const express = require("express")
const router = express.Router()

exports.getMscamps = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  // console.log('JSON.stringify(reqQuery)', JSON.stringify(reqQuery))
  const removeFileds = ['select', 'sort', 'page', 'size'];

  removeFileds.forEach((params) => delete reqQuery[params])

  let queryStr = JSON.stringify(reqQuery)

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  query = Mscamp.find(JSON.parse(queryStr)).populate('courses')
  // console.log('query', query)
  if (req.query.select) {

    const fileds = req.query.select.split(',').join('')
    query = query.select(fileds)
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join('')
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }
  const page = parseInt(req.query.page, 10) || 1
  const size = parseInt(req.query.size, 10) || 10
  const startIndex = (page - 1) * size;
  const endIndex = page * size;
  const total = await Mscamp.countDocuments();

  query.skip(startIndex).limit(size)
  const pagination = {}
  if (page != 1) {
    pagination.prve = { page: page - 1, size }
  }
  // console.log(total, 'total', endIndex)
  if (endIndex < total) {
    pagination.next = { page: page + 1, size }
  }
  const mscamp = await query
  res.status(200).json({ success: true, pagination, count: mscamp.length, mes: mscamp });
});
//
exports.creareMscamps = asyncHandler(async (req, res, next) => {

  const mscamp = await Mscamp.create(req.body)

  res.status(200).json({ success: true, mes: mscamp });
});

exports.updateMscamps = asyncHandler(async (req, res, next) => {
  const mscamp = await Mscamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res
    .status(200)
    .json({ success: true, data: mscamp });
});

exports.getMscampsId = asyncHandler(async (req, res, next) => {
  const mscamps = await Mscamp.findById(req.params.id)
  console.log(mscamps)
  res
    .status(200)
    .json({ success: true, data: mscamps });
  // if (!mscamps) {
  //   return next(new ErrorResponse(`response not ${req.params.id}`, 400))

  //   // res
  //   //   .status(400)
  //   //   .json({ success: false });
  // }
});
exports.putMscamps = asyncHandler(async (req, res, next) => {
  console.log('mscamp', req.user)
  const mscamp = await Mscamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res
    .status(200)
    .json({ success: true, data: mscamp });
});

exports.delMscamps = asyncHandler(async (req, res, next) => {
  const mscamp = await Mscamp.findById(req.params.id)
  mscamp.remove()
  res
    .json({ success: true, data: {} });
})
