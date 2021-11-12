const express = require("express");
const router = express.Router();
const {get_home_doctor,get_create_test} = require("../controllers/doctor");
const {isLoggedIn,isDoctor}=require('../controllers/Auth/middlewares')
router.get("/create/test", isLoggedIn, isDoctor, get_create_test);
router.get("/home/doctor", isLoggedIn, isDoctor, get_home_doctor);
module.exports = router;