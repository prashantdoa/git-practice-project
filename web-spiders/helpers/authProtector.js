const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const AuthSchema = require("../models/AuthModel");
const ErrorResponse = require("../utils/ErrorResponse");

let protected = async (req, res, next) => {
  let token;
  // checking header
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      next(new ErrorResponse("Not Athorized", 403));
    }
    try {
      // decoded jwt secret
      let decoded = jwt.verify(token, JWT_SECRET);
      req.user = await AuthSchema.findById(decoded.id);
      console.log(req.user);
      console.log(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      next(new ErrorResponse("Not Athorized", 403));
    }
  }
};

module.exports = { protected };
