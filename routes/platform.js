const express = require("express");
const router = express.Router();
const Platform = require("../models/platform.js");
const advancedResults = require("../middleware/advancedResults.js");

const { addPlatform, getList, delPlatform,upDatePlatform } = require("../controllers/platform.js")

router
  .route("/")
 .get(advancedResults(Platform), getList)
  
router.post("/add", addPlatform)

router.delete('/del', delPlatform)

router.put('/update', upDatePlatform)

module.exports = router;