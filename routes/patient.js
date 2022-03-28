const express = require("express");
const router = express.Router();
const { isLoggedIn,isPatient,isTestAssigned,isTestCompleted,isQuestionInTest}=require("../controllers/Auth/middlewares")
const {get_home_patient,get_start_test,post_start_test,get_mydoctor,get_question,update_pauseq_test}=require("../controllers/patient")
router.get("/home/patient/:id",isLoggedIn, isPatient, get_home_patient);
router.get("/start/test/:id",isLoggedIn, isPatient,isTestAssigned,get_start_test)
router.post("/start/test/:id",isLoggedIn, isPatient,isTestAssigned,isTestCompleted,post_start_test)
router.get("/mydoctor", isLoggedIn, isPatient,get_mydoctor)
router.get("/question/:id/:questionid",isLoggedIn, isPatient,isTestAssigned,isQuestionInTest,get_question)
router.get("/test/:id",isLoggedIn, isPatient,isTestAssigned,update_pauseq_test)
module.exports = router;