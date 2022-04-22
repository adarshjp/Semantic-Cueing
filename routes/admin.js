const express = require("express");
const {register_get,register_post,} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get,view_patient,view_doctor,view_Oneuser,get_edit_user,edit_user,delete_user,checkusername,get_details_for_graph,count_no_of_tests,count_no_of_questions,get_view_questions,get_edit_question,delete_question,post_edit_question} = require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,view_patient);
router.get("/view/doctor",isLoggedIn,isAdmin,view_doctor);

router.get("/view/question/:skip?",isLoggedIn,isAdmin,get_view_questions);

router.get("/view/:id",isLoggedIn,view_Oneuser);
router.get("/edit/:id",isLoggedIn,get_edit_user)
router.put("/edit/:id",isLoggedIn,edit_user)
router.delete("/delete/:id",isAdmin,isLoggedIn,delete_user)
router.post("/check-username",isAdmin,isLoggedIn,checkusername)

router.get("/data/users",isAdmin,isLoggedIn,get_details_for_graph)
router.get("/data/testcount",isAdmin,isLoggedIn,count_no_of_tests)
router.get("/data/questioncount",isAdmin,isLoggedIn,count_no_of_questions)

router.get("/edit/question/:questionid",isAdmin,isLoggedIn,get_edit_question)
router.post("/edit/question/:questionid",isAdmin,isLoggedIn,post_edit_question)

router.get("/delete/question/:questionid",isAdmin,isLoggedIn,delete_question)
module.exports = router;
