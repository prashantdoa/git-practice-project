const express = require("express");
const router = express.Router();
const { CreateStudentController } = require("../controllers/studentController");
const { protected } = require("../helpers/authProtector");
// @ACCESS private
// @METHOD VERBS POST
// HTTP api/student/create-student
router.post("/create-student", CreateStudentController);

module.exports = router;
