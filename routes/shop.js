const express = require("express");
const router = express.Router();
const Shop = require("../models/shop.js");
const { addShops, getList, delShops } = require("../controllers/shop.js")
const advancedResults = require("../middleware/advancedResults.js");

router
  .route("/")
  .get(advancedResults(Shop), getList)
router.post("/addShops", addShops).delete('/del',delShops)
module.exports = router;