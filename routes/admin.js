const express = require("express");
const {register_get,register_post,} = require("../controllers/Auth/auth");
const {isAdmin,isLoggedIn}=require('../controllers/Auth/middlewares')
const {admin_get,view_patient,view_doctor,view_Onepatient,view_Onedoctor,get_edit_patient,get_edit_doctor,edit_patient,edit_doctor} = require('../controllers/admin')
const router = express.Router();

router.get("/register", isLoggedIn, register_get);
router.post("/register", isLoggedIn,isAdmin,register_post);
router.get("/home/admin", isLoggedIn,isAdmin,admin_get);
router.get("/view/patient", isLoggedIn,isAdmin,view_patient);
router.get("/view/doctor",isAdmin,isLoggedIn,view_doctor);
router.get("/view/:id",isAdmin,isLoggedIn,view_Oneuser);
router.get("/edit/:id",isAdmin,isLoggedIn,get_edit_user)
router.put("/edit/:id",isAdmin,isLoggedIn,edit_user)
router.delete("/delete/:id",isadmin,isLoggedIn,delete_user)
module.exports = router;
