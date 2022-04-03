const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  question: {
    data: Buffer,
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
  hints:[
    {
      hint:{
        data: Buffer,
        contentType: String,
      },
      score:{
        type: String,
      }
    }
  ],
  score: {
    type: String,
  },
});
module.exports = mongoose.model("Question", questionSchema);
