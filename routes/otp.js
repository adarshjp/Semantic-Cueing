const express = require('express');
const router = express.Router();
const {isLoggedIn}= require("../controllers/Auth/middlewares");
const {sendOtp,verifyOtp}= require("../controllers/otp");
router.post("/send/:via",isLoggedIn,sendOtp)
router.post("/verify",isLoggedIn,verifyOtp);
module.exports = router;