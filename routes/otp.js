const express = require('express');
const router = express.Router();
const {isLoggedIn}= require("../controllers/Auth/middlewares");
const {sendOtp,verifyOtp}= require("../controllers/otp");
router.post("/send/:via/:version",sendOtp)
router.post("/verify",verifyOtp);
module.exports = router;