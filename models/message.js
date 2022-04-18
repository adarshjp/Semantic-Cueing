const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message:{
        type:String,
        required:true
    },
    creationTime:{
        type:Date,
        default:Date.now,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false,
        required:true
    },
});
module.exports = new mongoose.model("Message",messageSchema);