const { JWT_COOKIE_EXPIRE, NODE_ENV } = require("../config");
const authSchema = require("../models/AuthModel");
const ErrorResponse = require("../utils/ErrorResponse");
exports.RegisterController = async (req, res, next) => {
  try {
    let { username, email, password, role } = req.body;
    let user = await new authSchema({
      username,
      email,
      password,
      role,
    }).save();

    sendResponseToken(user, 201, res);
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("INTERNAL SERVER ERROR😂", 500));
  }
};

exports.signInController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await authSchema.findOne({ email }).select("+password");
    if (!email && !password) {
      return next(new ErrorResponse("EMAIL AND PASSWORD ARE REQUIRED", 401));
    }
    if (!user) {
      return next(new ErrorResponse("USER IS NOT EXITS", 401));
    }
    let matchPassword = await user.matchPASSWORD(password);
    if (!matchPassword) {
      return next(new ErrorResponse("PASSWORD IS INCORRECT", 401));
    }

    sendResponseToken(user, 201, res);
  } catch (err) {
    console.log(err);
    next(new ErrorResponse("INTERNAL SERVER ERROR"));
  }
};

const sendResponseToken = (user, statuscode, res) => {
  let TOKEN = user.getTOKEN();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV === "production",
  };
  res
    .status(statuscode)
    .cookie("cookie", options, TOKEN)
    .json({ success: true, messag: "successfully token fecthed", TOKEN });
};
