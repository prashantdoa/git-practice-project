const express = require("express");
const {
  RegisterController,
  signInController,
} = require("../controllers/authContoller");
const router = express.Router();
// @Access PUBLIC
// @HTTP METHOD POST
// @URL /api/auth/register
router.post("/register", RegisterController);

// @Access PUBLIC
// @HTTP METHOD POST
// @URL /api/auth/signin
router.post("/signin", signInController);

module.exports = router;
