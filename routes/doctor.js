const express = require("express");
const router = express.Router();
const {get_home_doctor,get_create_test,post_create_test,get_view_assigned_patient,get_patient_details,get_patient_test_details,get_view_test_created,get_edit_test,post_edit_test,get_questions} = require("../controllers/doctor");
const { isLoggedIn, isDoctor } = require("../controllers/Auth/middlewares");
router.get("/create/test/:skip?", isLoggedIn, isDoctor, get_create_test);
router.get("/home/doctor/:id", isLoggedIn, isDoctor, get_home_doctor);
router.post("/create/test", isLoggedIn, isDoctor, post_create_test);
router.get("/view/patient/:doctorid", isLoggedIn, isDoctor, get_view_assigned_patient); // gets the details of all patients assigned to the doctor

router.get("/data/patientdetails/:patientid", isLoggedIn, isDoctor, get_patient_details); // gets the details of particular patient
router.get("/data/testdetails/:patientid", isLoggedIn, isDoctor, get_patient_test_details); // gets the details of particular patient

router.get("/view/tests/:doctorid", isLoggedIn, isDoctor, get_view_test_created); // gets the details of tests created by the docotr

router.get("/edit/test/:testid", isLoggedIn, isDoctor, get_edit_test);
router.put("/edit/test/:testid", isLoggedIn, isDoctor, post_edit_test);
router.get("/edit/test/:skip", isLoggedIn, isDoctor, get_questions);
module.exports = router;
