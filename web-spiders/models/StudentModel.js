const { Schema, model } = require("mongoose");

const StudenSchema = new Schema(
  {
    studentname: {
      type: String,
      required: [true, "student name is required"],
    },
    studentemail: {
      type: String,
      required: [true, "student email is required"],
    },
    studentmobile: {
      type: String,
      required: [true, "student mobile number is required"],
    },
    studentedu: {
      type: String,
      required: [true, "student edu deatails required"],
    },
    studentprereferedcourse: {
      type: String,
      required: [true, "student prerefered course is redquired"],
    },
    studentpreferedbranch: {
      type: String,
      required: [true, "student studentpreferedbranch is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("studentDetails", StudenSchema);
