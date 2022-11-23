const authModel = require("../models/AuthModel");
const ErrorResponse = require("../utils/ErrorResponse");
const ProfileSchema = require("../models/ProfileModel");
const CourseSchema = require("../models/courseModel");

exports.GetProfileController = async (req, res, next) => {
  try {
    let user = await authModel.findById(req.user.id).select("+password");
    res.status(201).json({ success: true, user });
    console.log(user);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("SERVER INTERNAL ERROR", 500));
  }
};

exports.CreateProfileContoller = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    // let data = { ...req.body };
    let { firstname, lastname, phone, address, dob, city, gender } = req.body;
    let user = req.user.id;
    console.log(user);
    let finalData = await new ProfileSchema({
      user,
      firstname,
      lastname,
      phone,
      address,
      dob,
      city,
      gender,
    }).save();

    let profile = await authModel
      .findById(req.user.id)
      .updateOne({ $set: { profile: finalData } });
    console.log(profile);
    console.log(finalData);
    res.status(200).json({
      success: true,
      message: "profile created successfully",
      finalData,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("INTERNAL SEVER ERROR", 500));
  }
};

exports.GetMe = async (req, res, next) => {
  try {
    console.log("im getme");
    let payload = await ProfileSchema.find().populate("user", [
      "email",
      "username",
    ]);
    res.status(200).json({ success: true, payload });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("INTERNAL SERVER ERROR"), 500);
  }
};

//====================purched course==================
exports.PurchasedController = async (req, res, next) => {
  try {
    console.log("im purchaed");
    let course = await CourseSchema.findOne({
      course_name: req.body.course_name,
    }).lean();
    console.log(course);
let id= req.user.profile[0]
console.log(id);
    let purchase = await ProfileSchema.findById(id).updateOne({ $push: { purchase: course } });
    console.log(purchase);
    res.send("okkkkk");
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Internal server error", 500));
  }
};
