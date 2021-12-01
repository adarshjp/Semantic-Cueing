const express = require("express");
const router = express.Router();
const { isLoggedIn,isPatient}=require("../controllers/Auth/middlewares")
const {get_home_patient}=require("../controllers/patient")
router.get("/home/patient/:id",isLoggedIn, isPatient, get_home_patient);

module.exports = router;