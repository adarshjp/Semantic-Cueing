const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  question: {
    type: Buffer,
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
  hints: [
    {
      hint: {
        type: Buffer,
        contentType: String,
      },
      score: {
        type: Number,
        required: true,
        min: 10,
      },
    },
  ],
  score: {
    type: Number,
    required: true,
    min: 100,
  },
});
exports.Question = mongoose.model("Question", questionSchema);
