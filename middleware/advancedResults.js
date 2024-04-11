const advancedResults = (model, populate) => async (req, res, next) => {


 let query;

 const reqQuery = { ...req.query };

 // 处理关键字
 const removeFields = ["select", "sort", "page", "size"];
 // 清除关键字及值
 removeFields.forEach((param) => delete reqQuery[param]);

 let queryStr = JSON.stringify(reqQuery);
 queryStr = queryStr.replace(
   /\b(gt|gte|lt|lte|in)\b/g,
   (match) => `$${match}`
 );
 console.log('JSON.parse(queryStr)',JSON.parse(queryStr))
 if (!JSON.parse(queryStr).platform) {
  query = model.find();
 } else {
  query = model.find(JSON.parse(queryStr));
}
 

 // 在query所有数据的基础上,在加条件
 if (req.query.select) {
   const fields = req.query.select.split(",").join(" ");
   query = query.select(fields);
 }

 // 处理sort排序
 if (req.query.sort) {
   const sortBy = req.query.sort.split(",").join(" ");
   query = query.sort(sortBy);
 } else {
   query = query.sort({ "createdAt": -1 });
 }

 // 分页
 const page = parseInt(req.query.page, 10) || 1;
 const size = parseInt(req.query.size, 10) || 20;
 const startIndex = (page - 1) * size;
 const endIndex = page * size;
 const total = await model.countDocuments();

 query.skip(startIndex).limit(size);

 // 是否关联
 if (populate) {
   query = query.populate(populate);
 }

 const results = await query;

 // 分页返回值
 const pagination = {};
 if (startIndex > 0) {
   pagination.prev = { page: page - 1, size };
 }

 if (endIndex < total) {
   pagination.next = { page: page + 1, size };
 }

 res.advancedResults = {
   success: true,
   total,
   pagination,
   data: results,
 };

 next();
};

module.exports = advancedResults;

