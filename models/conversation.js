const mongoose = require("mongoose");
const conversationSchema= new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
})
module.exports = new mongoose.model("Conversation",conversationSchema);