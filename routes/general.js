const express = require('express');
const router = express.Router();
const passport = require('passport');

const{change_password,login_get,login_post,set_password}=require('../controllers/Auth/auth');
const {isLoggedIn}=require('../controllers/Auth/middlewares');
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/admin/home",
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
module.exports = router;