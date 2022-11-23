const express = require("express");
const { protected } = require("../helpers/authProtector");
const {
  createCourseController,
  fetchAllCourseController,
  fetchOneCourseController,
  deleteOneCourseController,
  updateOneCourseController,
} = require("../controllers/courseController");
const multer = require("multer");
const { storage } = require("../middlewares/multer");
const router = express.Router();

let upload = multer({
  storage: storage,
});

router.post(
  "/create-course",
  upload.any("files"),
  
  createCourseController
);
router.get("/course-all", upload.any("files"), fetchAllCourseController);
router.get("/:id", upload.any("files"), fetchOneCourseController);
router.delete("/:id", deleteOneCourseController);
router.put(
  "/update/:id",
  upload.any("files"),
  protected,
  updateOneCourseController
);

module.exports = router;
