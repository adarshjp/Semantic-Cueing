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
} = require("../controllers/auth");
const router = express.Router();

router.get("/register", isLoggedIn, isAdmin, register_get);
router.post("/register", register_post);
router.get("/login", login_get);
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
router.post("/admin/home", admin_get);
module.exports = router;
