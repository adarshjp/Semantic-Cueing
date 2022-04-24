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
const{change_password,login_get,login_post,set_password,set_post,get_changepassword}=require('../controllers/Auth/auth');
const {isLoggedIn, isAdmin}=require('../controllers/Auth/middlewares');
const { addquestions_get,addquestions_post,view_question,view_Onequestion,forgotpassword_get,get_edit_question,put_edit_question,put_edit_hint} = require('../controllers/general');
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
router.get("/changepassword",isLoggedIn,get_changepassword);
router.post("/changepassword", isLoggedIn, change_password);
router.get("/login", login_get);
router.get("/",(req,res)=>{
  res.redirect("/login");
})
router.post("/setpassword",isLoggedIn,set_password);
router.post("/set",set_post);
router.get("/addquestion",isLoggedIn,isAdmin,addquestions_get)
router.post("/addquestion",upload.array("image",5),isLoggedIn,isAdmin,addquestions_post)
router.get("/view/question",isAdmin,isLoggedIn,view_question);
router.get("/view/question/:id",isAdmin,isLoggedIn,view_Onequestion);
router.get("/forgotpassword",forgotpassword_get);
router.get("/edit/question/:questionid",isLoggedIn,isAdmin,get_edit_question)
router.put("/edit/question/:questionid",upload.array("question",1),isLoggedIn,isAdmin,put_edit_question)
router.put("/edit/hint/:questionid/:hintid",upload.array("hint",1),isLoggedIn,isAdmin,put_edit_hint)
module.exports = router;