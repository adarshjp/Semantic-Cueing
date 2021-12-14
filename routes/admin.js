const express = require("express");
const passport = require("passport");
const {
  register_get,
  register_post,
} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get,view_patient,view_doctor,view_Onepatient,view_Onedoctor,view_question,view_Onequestion}=require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,view_patient);
router.get("/view/doctor",isAdmin,isLoggedIn,view_doctor);
router.get("/view/patient/:id",isAdmin,isLoggedIn,view_Onepatient);
router.get("/view/doctor/:id",isAdmin,isLoggedIn,view_Onedoctor);

module.exports = router;
