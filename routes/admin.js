const express = require("express");
const {register_get,register_post,} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get,view_patient,view_doctor,view_Oneuser,get_edit_user,edit_user,delete_user,checkusername,get_details_for_graph,count_no_of_tests,count_no_of_questions,get_view_questions,get_edit_question,delete_question,put_edit_question} = require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,view_patient);
router.get("/view/doctor",isLoggedIn,isAdmin,view_doctor);

router.get("/view/question/:skip?",isLoggedIn,isAdmin,get_view_questions);  // to view the list of questions

router.get("/view/:id",isLoggedIn,view_Oneuser);
router.get("/edit/:id",isLoggedIn,get_edit_user)
router.put("/edit/:id",isLoggedIn,edit_user)

router.get("/delete/question/:questionid",isAdmin,isLoggedIn,delete_question); // to delete a question

router.delete("/delete/:id",isAdmin,isLoggedIn,delete_user)
router.post("/check-username",isAdmin,isLoggedIn,checkusername)

router.get("/data/users",isAdmin,isLoggedIn,get_details_for_graph)
router.get("/data/testcount",isAdmin,isLoggedIn,count_no_of_tests)
router.get("/data/questioncount",isAdmin,isLoggedIn,count_no_of_questions)

router.get("/edit/question/:questionid",isLoggedIn,isAdmin,get_edit_question)
router.put("/edit/question/:questionid",isLoggedIn,isAdmin,upload.array("image",5),put_edit_question)

module.exports = router;
