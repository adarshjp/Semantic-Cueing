const express = require('express');
const router = express.Router();
const passport = require('passport');

const{change_password,login_get,login_post,set_password}=require('../controllers/Auth/auth');
const {isLoggedIn, isAdmin}=require('../controllers/Auth/middlewares');
const { addquestions_get } = require('../controllers/general');
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/home/admin",
  }),
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
module.exports = router;