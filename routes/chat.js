const express = require('express');
const router = express.Router();
const {get_messages_patient,get_messages_doctor,post_messages,renderChatWindow_patient,renderChatWindow_doctor} = require("../controllers/chat")
const {isLoggedIn,isDoctor,isPatient,isMappedDoctor}=require("../controllers/Auth/middlewares")
router.get("/messages",isLoggedIn,isPatient,get_messages_patient)
router.get("/messages/:patientId",isLoggedIn,isDoctor,isMappedDoctor,get_messages_doctor);
router.post("/messages",isLoggedIn,post_messages);
router.get("/chat",isLoggedIn,isPatient,renderChatWindow_patient);
router.get("/chat/:patientId",isLoggedIn,isDoctor,isMappedDoctor,renderChatWindow_doctor);
module.exports = router;