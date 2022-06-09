const express = require("express");
const upload = require("../setup/multer");
const { register_get, register_post, } = require("../controllers/auth");
const { isAdmin, isLoggedIn } = require('../middlewares/middlewares')
const { admin_get, view_patient, view_doctor, view_Oneuser, get_edit_user, edit_user, delete_user, checkusername, get_details_for_graph, count_no_of_tests, count_no_of_questions, active_patient, change_doctor } = require('../controllers/admin')
const { registerValidator } = require('../validators/signupValidators')

const router = express.Router();

router.get("/register",isLoggedIn,isAdmin,register_get);
router.post("/register", upload.array("displaypic", 1), isLoggedIn, isAdmin, registerValidator, register_post);
router.get("/home/admin", isLoggedIn, isAdmin, admin_get);
router.get("/view/patient", isLoggedIn, isAdmin, view_patient);
router.get("/view/doctor", isLoggedIn, isAdmin, view_doctor);

router.get("/view/:id([\\dA-Fa-f]+)", isLoggedIn, view_Oneuser);
router.get("/edit/:id", isLoggedIn, get_edit_user)
router.put("/edit/:id", isLoggedIn, edit_user)

router.delete("/delete/:id", isLoggedIn, isAdmin, delete_user)
router.post("/check-username", isLoggedIn, isAdmin, checkusername)

router.get("/data/users", isLoggedIn, isAdmin, get_details_for_graph)
router.get("/data/testcount", isLoggedIn, isAdmin, count_no_of_tests)
router.get("/data/questioncount", isLoggedIn, isAdmin, count_no_of_questions)
router.put("/active/:patientid", isLoggedIn, isAdmin, active_patient);
router.patch('/change/doctor/:patientid', isLoggedIn, isAdmin, change_doctor)
module.exports = router;
