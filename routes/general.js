const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const{change_password,login_get,login_post,set_password}=require('../controllers/Auth/auth');
const {isLoggedIn, isAdmin}=require('../controllers/Auth/middlewares');
const { addquestions_get,addquestions_post } = require('../controllers/general');
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  login_post
);
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.flash("success", "Logged out successfully");
  res.status(200);
  res.redirect("/login");
});
router.post("/changepassword", isLoggedIn, change_password);
router.get("/login", login_get);
router.post("/setpassword",isLoggedIn,set_password);
router.get("/addquestion",isLoggedIn,isAdmin,addquestions_get)
router.post("/addquestion",upload.array("image",5),isLoggedIn,isAdmin,addquestions_post)
module.exports = router;