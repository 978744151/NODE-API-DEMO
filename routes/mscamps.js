const express = require("express");
const router = express.Router();
const {
  getMscamps,
  creareMscamps,
  getMscampsId,
  putMscamps,
  delMscamps,
} = require("../controllers/mscamps");
// router.get("/", (req, res) => { });
const { protect, authorize } = require("../middleware/auth.js");
const courseRouter = require("./course")
router.use('/:mscampId/course', courseRouter)

router.route("/").get(protect, authorize("admin", 'user'), getMscamps).post(creareMscamps);
router.route("/:id").get(getMscampsId).put(protect, authorize("admin", "user"), putMscamps).delete(protect, authorize("admin", "user"), delMscamps);

// router
//   .route("/:id")
//   .get(getMscamp)
//   .put(protect, authorize("admin", "user"), updateMscamp)
//   .delete(protect, authorize("admin", "user"), deleteMscamp);

// router.get("/:id", (req, res) => {});
// router.post("/", (req, res) => {
//   res.status(200).json({ success: true, mes: `创建米修数据` });
// });
// router.route("/");

// router.put("/:id", (req, res) => {});
// router.delete("/:id", (req, res) => {});

module.exports = router;
