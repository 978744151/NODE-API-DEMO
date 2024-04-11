const logger = (req, res, next) => {
  res.data = { msg: "msg" };
  console.log(`${req.method}12121`);
  next();
};
module.exports = logger;
