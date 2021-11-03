const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  question: {
    data: Buffer,
    required: true,
    contentType: String,
  },
  answer: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 1,
  },
  hint1:{
    img:{
      data: Buffer,
      contentType: String,
    },
    score:{
      type:Number,
      required:true,
      min:10,
    }
  },
  hint2:{
    img:{
      data: Buffer,
      contentType: String,
    },
    score:{
      type:Number,
      required:true,
      min:10,
    }
  },
  hint3:{
    img:{
      data: Buffer,
      contentType: String,
    },
    score:{
      type:Number,
      required:true,
      min:10,
    }
  },
  hint4:{
    img:{
      data: Buffer,
      contentType: String,
    },
    score:{
      type:Number,
      required:true,
      min:10,
    }
  },
  score: {
    type: Number,
    required: true,
    min: 100,
  },
});
exports.Question = mongoose.model("Question", questionSchema);
