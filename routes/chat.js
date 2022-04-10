const express = require('express');
const router = express.Router();
const {get_messages,post_messages,renderChatWindow}= require("../controllers/chat")
router.get("/messages/:patientId?",get_messages);
router.post("/messages/:patientId?",post_messages);
router.get("/chat/:patientId?",renderChatWindow);
module.exports = router;