const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../setup/multer');
const{change_password,login_get,login_post,set_password,set_post,get_changepassword}=require('../controllers/auth');
const {isLoggedIn, isAdmin, isAdminOrDoctor}=require('../middlewares/middlewares');
const { addquestions_get,addquestions_post,view_question,view_Onequestion,forgotpassword_get,get_edit_question,put_edit_question,put_edit_hint,delete_question,get_view_questions} = require('../controllers/general');
const {loginValidator}=require('../validators/loginValidators');
router.post("/login",loginValidator,
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
  res.cookie('lang', 'en');
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
router.get("/addquestion",isLoggedIn,isAdminOrDoctor,addquestions_get)
router.post("/addquestion",upload.array("image",5),isLoggedIn,isAdminOrDoctor,addquestions_post);
router.get("/view/questions/:skip?", isLoggedIn, isAdminOrDoctor, get_view_questions);  // to view the list of questions

router.get("/view/question",isAdmin,isLoggedIn,view_question);
router.get("/view/question/:id",isLoggedIn,isAdmin,view_Onequestion);

router.get("/forgotpassword",forgotpassword_get);
router.get("/edit/question/:questionid",isLoggedIn,isAdminOrDoctor,get_edit_question)
router.put("/edit/question/:questionid",upload.array("question",1),isLoggedIn,isAdminOrDoctor,put_edit_question)
router.put("/edit/hint/:questionid/:hintid",upload.array("hint",1),isLoggedIn,isAdminOrDoctor,put_edit_hint)
router.delete("/delete/question/:questionid",isLoggedIn,isAdminOrDoctor,delete_question); // to delete a question

module.exports = router;