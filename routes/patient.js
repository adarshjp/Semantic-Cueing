const express = require("express");
const router = express.Router();
const { isLoggedIn,isPatient,isTestAssigned}=require("../controllers/Auth/middlewares")
const {get_home_patient,get_start_test}=require("../controllers/patient")
router.get("/home/patient/:id",isLoggedIn, isPatient, get_home_patient);
router.get("/start/test/:id",isLoggedIn, isPatient,isTestAssigned,get_start_test)
module.exports = router;