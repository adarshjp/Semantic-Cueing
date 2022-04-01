const mongoose = require("mongoose");
const otpSchema= new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:true,
    },
    creationTime:{
        type:Date,
        default:Date.now,
        required:true
    },
    verificationKey:{
        type:String,
        required:true
    }
})
module.exports = new mongoose.model("Otp",otpSchema);