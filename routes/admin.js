const express = require("express");
const passport = require("passport");
const {
  register_get,
  register_post,
} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get,view_patient,view_doctor,view_Onepatient,view_Onedoctor,get_edit_patient,get_edit_doctor,edit_patient,edit_doctor} = require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,view_patient);
router.get("/view/doctor",isAdmin,isLoggedIn,view_doctor);
router.get("/view/patient/:id",isAdmin,isLoggedIn,view_Onepatient);
router.get("/view/doctor/:id",isAdmin,isLoggedIn,view_Onedoctor);
router.get("/edit/patient/:id",isAdmin,isLoggedIn,get_edit_patient)
router.put("/edit/patient/:id",isAdmin,isLoggedIn,edit_patient)
router.get("/edit/doctor/:id",isAdmin,isLoggedIn,get_edit_doctor)
router.put("/edit/doctor/:id",isAdmin,isLoggedIn,edit_doctor)
router.delete("/delete/:id",isadmin,isLoggedIn,delete_user)
module.exports = router;
