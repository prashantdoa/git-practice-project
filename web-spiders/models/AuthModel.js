const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_COOKIE_EXPIRE,
} = require("../config/index");

let AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "valid email required",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password should be more than 6 character"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "publishe", "admin"],
      defult: "user",
    },
    profile: {
      type: [""],
    },
  },
  { timestamps: true }
);
AuthSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// creating mongoose cus
AuthSchema.methods.getTOKEN = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};
AuthSchema.methods.matchPASSWORD = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

module.exports = model("auth", AuthSchema);
