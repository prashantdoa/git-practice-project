const courseSchema = require("../models/courseModel");
const ErrorResponse = require("../utils/ErrorResponse");

/*---------------
@ACCESS private
@HTTP verbs POST
@URL /api/course/create-course
*/
// ----------createing course POST method-----------
exports.createCourseController = async (req, res, next) => {
  try {
    console.log("why im coming course!");
    let course_image = req.files[0];
    let course_video = req.files[1];
    let payload = { ...req.body, course_image, course_video };
    await courseSchema.create(payload);
    console.log(payload);
    // res.send("ok");
    res
      .status(201)
      .json({ success: true, message: "successfully course created", payload });
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("Internal server error", 500));
  }
};
// ------fetchAllCourse GET method---------------
exports.fetchAllCourseController = async (req, res, next) => {
  try {
    console.log("im fetch all");
    let data = await courseSchema.find({});
    console.log(data);
    // res.send("ok");
    res
      .status(201)
      .json({ success: true, message: "successfully fetched all data", data });
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("Internal server error", 500));
  }
};
// -------fetchOneCourse GET method---------------
exports.fetchOneCourseController = async (req, res, next) => {
  try {
    console.log("im fecth one");
    let data = await courseSchema.find({ _id: req.params.id });
    console.log(data);
    // res.send("ok");
    res
      .status(201)
      .json({ success: true, message: "successfully fetched one data", data });
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("Internal server error", 500));
  }
};
//---------deleteOneCourse DELETE method---------
exports.deleteOneCourseController = async (req, res, next) => {
  try {
    console.log("im delete one");
    let data = await courseSchema.deleteOne({ _id: req.params.id });
    console.log(data);
    // res.send("ok");
    res
      .status(201)
      .json({ success: true, message: "successfully delted one data", data });
  } catch (err) {
    console.log(err);
  }
};

// ----------updateOneCourse--PUT method--------------------
exports.updateOneCourseController = async (req, res, next) => {
  try {
    console.log("im updated one");
    let course_image = req.files[0];
    let course_video = req.files[1];
    let payload = { ...req.body, course_image, course_video };
    await courseSchema.updateOne({ _id: req.params.id }, { $set: payload });
    // res.send("ok");
    res.status(201).json({
      success: true,
      message: "successfully updated",
      payload,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("Internal server error", 500));
  }
};
