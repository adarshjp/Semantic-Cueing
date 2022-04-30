const express = require("express");
const router = express.Router();
const {get_home_doctor,get_create_test,post_create_test,get_view_assigned_patient,get_patient_details,get_patient_test_details,get_view_test_created,get_edit_test,put_edit_test,get_question,delete_test,update_level,discharge_patient} = require("../controllers/doctor");
const { isLoggedIn, isDoctor,isMappedDoctor } = require("../controllers/Auth/middlewares");
router.get("/create/test/:skip?", isLoggedIn, isDoctor, get_create_test);
router.get("/home/doctor/:id", isLoggedIn, isDoctor, get_home_doctor);
router.post("/create/test", isLoggedIn, isDoctor, post_create_test);
router.get("/view/patient/:doctorid", isLoggedIn, isDoctor, get_view_assigned_patient); // gets the details of all patients assigned to the doctor
router.get("/data/patientdetails/:patientid", isLoggedIn, isDoctor, get_patient_details); // gets the details of particular patient
router.get("/data/testdetails/:patientid", isLoggedIn, isDoctor, get_patient_test_details); // gets the details of particular patient
router.get("/view/tests/:doctorid", isLoggedIn, isDoctor, get_view_test_created); // gets the details of tests created by the docotr
router.get("/edit/test/:testid", isLoggedIn, isDoctor, get_edit_test);
router.put("/edit/test/:testid", isLoggedIn, isDoctor, put_edit_test);
router.get("/question/:questionid", isLoggedIn, isDoctor, get_question);
router.delete("/delete/test/:testid", isLoggedIn, isDoctor, delete_test);
router.put("/level/:patientid", isLoggedIn, isDoctor, update_level);
router.put("/discharge/:patientid", isLoggedIn, isDoctor, discharge_patient);
module.exports = router;
