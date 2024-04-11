const express = require("express");
const router = express.Router();
const { getCensus ,addCensus,delCensus} = require("../controllers/census.js")
router.get("/getCensus", getCensus)
router.post('/addCensus', addCensus).delete('/delCensus', delCensus)
module.exports = router;