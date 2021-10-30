const express = require("express");
const passport = require("passport");
const {
  register_get,
  register_post,
} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get}=require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, isAdmin, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,);
router.get("/view/doctor",isAdmin,isLoggedIn,);
module.exports = router;
