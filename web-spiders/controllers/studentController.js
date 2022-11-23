const StudenSchema = require("../models/StudentModel");
const ErrorResponse = require("../utils/ErrorResponse");
const CourseSchema = require("../models/courseModel");

// -----------Creating student details Post method----------
exports.CreateStudentController = async (req, res, next) => {
  try {
    // inserting student details to the user--------
    const course = await CourseSchema.updateOne(
      { course_name: req.body.studentprereferedcourse },
      { $push: { students: req.body } }
    );
    console.log(course);
    // ------creating new student database--------
    const payload = { ...req.body };
    console.log(payload);
    await new StudenSchema(payload).save();
    res.status(200).json({
      success: true,
      message: "student details created successfully",
      payload,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Internal server error", 500));
  }
};
