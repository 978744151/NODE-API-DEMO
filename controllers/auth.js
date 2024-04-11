const asyncHandler = require("../middleware/async.js");
const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse")

/**
 * post   /api/v1/auth/register
 */
exports.register = asyncHandler(async (req, res, next) => {
 const { name, email, role, password } = req.body
 const user = await User.create({ name, email, role, password })
 const token = user.getSignedJwtToken()
 res.status(200).json({ success: true, data: user, token })
})
/**
 *@route post   /api/v1/auth/login
 */
exports.login = asyncHandler(async (req, res, next) => {
  console.log(req.body)
 const { email, password } = req.body;

 // 验证邮箱和密码是否为空
 if (!email || !password) {
  return next(new ErrorResponse("请填写邮箱和密码", 400));
 }

 // 获取用户信息
 const user = await User.findOne({ email }).select("+password");

 // 校验用户信息是否存在
 if (!user) {
  return next(new ErrorResponse("参数有误", 401));
 }

 //  密码匹配
 const isMatch = await user.matchPassword(password);
 if (!isMatch) {
  return next(new ErrorResponse("密码错误", 401));
 }

 // 生成token;
 sendTokenResponse(user, 200, res);
});

// 生成token并存储到cookie的方法
const sendTokenResponse = (user, statusCode, res) => {
 const token = user.getSignedJwtToken();
 const options = {
  expires: new Date(
   Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
 };

 if (process.env.NODE_ENV == "production") {
  options.secure = true;
 }

 res
  .status(statusCode)
  .cookie("token", token, options)
  .json({ success: true, token });
};
