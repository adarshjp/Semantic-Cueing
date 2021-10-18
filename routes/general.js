const express = require('express');
const router = express.Router();
const passport = require('passport');

const{change_password,login_get,login_post,isLoggedIn,set_password}=require('../controllers/auth');
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
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
module.exports = router;