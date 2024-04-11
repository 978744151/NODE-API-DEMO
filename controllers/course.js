const asyncHandler = require("../middleware/async.js");
const Course = require("../models/Course.js");
const Mscamp = require("../models/Mscamp.js");
const ErrorResponse = require("../utils/errorResponse")
exports.getCourses = asyncHandler(async (req, res, next) => {
 /**
 * 获取课程数据
 * get /api/v1/mscamps/:mscampId/courses 根据某个mscampId 获取courses
 * private
 */
 let query;
 const reqQuery = { ...req.query };
 console.log('JSON.stringify(reqQuery)', JSON.stringify(reqQuery))
 const removeFileds = ['select', 'sort', 'page', 'size', 'name'];
 removeFileds.forEach((params) => delete reqQuery[params])
 let queryStr = JSON.stringify(reqQuery)
 console.log('req.query', query)
 queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
 query = Course.find(JSON.parse(queryStr)).populate('mscamp')
 if (req.query.select) {

  const fileds = req.query.select.split(',').join('')
  console.log(fileds, fileds)
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
 const total = await Course.countDocuments();

 query.skip(startIndex).limit(size)
 const pagination = {}
 if (page != 1) {
  pagination.prve = { page: page - 1, size }
 }
 if (endIndex < total) {
  pagination.next = { page: page + 1, size }
 }
 const courses = await query
 // if (req.params.mscampId) {
 //  query = Course.find({ mscamp: req.params.mscampId })
 // } else {
 //  query = Course.find().populate('mscamp')
 // }

 // const courses = await query;
 // console.log(courses)
 res.status(200).json({ success: true, count: courses.length, data: courses, });
})

exports.getCourse = asyncHandler(async (req, res, next) => {
 const course = await Course.findById(req.params.id).populate({
  path: 'mscamp',
  select: 'name description'
 })
 if (!course) {
  return next(
   new ErrorResponse(`response not ${req.params.id}`)
  )
 }
 res.status(200).json({ success: true, count: course.length, data: course, });
})
/**
 * 添加课程数据
 * post /api/1/mscamps/:mscampId/courses
 * private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
 const mscamp = await Mscamp.findById(req.params.mscampId)
 if (!mscamp) {
  return next(
   new ErrorResponse(`response not ${req.params.mscampId}`)
  )
 }
 console.log(req)
 const course = await Course.create(req.body)
 res.status(200).json({ success: true, count: course.length, data: course, });
})

exports.putCourse = asyncHandler(async (req, res, next) => {
 const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
 })
 res
  .status(200)
  .json({ success: true, data: course });
});

exports.delCourse = asyncHandler(async (req, res, next) => {
 const course = await Course.findById(req.params.id)
 course.remove()
 res
  .json({ success: true, data: {} });
})
