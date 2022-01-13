const express = require("express");
const router = express.Router();
const { isLoggedIn,isPatient,isTestAssigned,isTestCompleted}=require("../controllers/Auth/middlewares")
const {get_home_patient,get_start_test,post_start_test,get_mydoctor}=require("../controllers/patient")
router.get("/home/patient/:id",isLoggedIn, isPatient, get_home_patient);
router.get("/start/test/:id",isLoggedIn, isPatient,isTestAssigned,get_start_test)
router.post("/start/test/:id",isLoggedIn, isPatient,isTestAssigned,isTestCompleted,post_start_test)
router.get("/mydoctor", isLoggedIn, isPatient,get_mydoctor)
module.exports = router;