const express = require("express");
const passport = require("passport");
const {
  isLoggedIn,
  isAdmin,
  register_get,
  register_post,
  login_get,
  login_post,
  admin_get,
  change_password,
} = require("../controllers/auth");
const router = express.Router();

router.get("/register", isLoggedIn, isAdmin, register_get);
router.post("/register", register_post);
router.post("/admin/home", admin_get);
module.exports = router;
