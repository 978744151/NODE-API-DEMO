const express = require("express");
const router = express.Router({ mergeParams: true });

const { getCourses, getCourse, addCourse, delCourse, putCourse } = require("../controllers/course")

router.route("/").get(getCourses).post(addCourse)
router.route("/:id").get(getCourse).delete(delCourse).put(putCourse)
module.exports = router;