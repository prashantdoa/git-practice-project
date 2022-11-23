const express = require("express");
const router = express.Router();
const {
  GetProfileController,
  CreateProfileContoller,
  GetMe,
  PurchasedController,
} = require("../controllers/profileController");
const { protected } = require("../helpers/authProtector");
router.get("/", protected, GetProfileController);
router.post("/create-profile", protected, CreateProfileContoller);
router.get("/get-me", protected, GetMe);
router.post("/purchased", protected, PurchasedController);

module.exports = router;
