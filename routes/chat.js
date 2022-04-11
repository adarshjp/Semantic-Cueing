const express = require('express');
const router = express.Router();
const {get_messages,post_messages,renderChatWindow}= require("../controllers/chat")
const {isLoggedIn}=require("../controllers/Auth/middlewares")
router.get("/messages/:patientId?",isLoggedIn,get_messages);
router.post("/messages/:patientId?",isLoggedIn,post_messages);
router.get("/chat/:patientId?",isLoggedIn,renderChatWindow);
module.exports = router;