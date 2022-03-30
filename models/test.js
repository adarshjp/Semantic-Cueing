const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  patientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  noofquestion: {
    type: Number,
    default: 0,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  level: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "pending",
  },
  pauesdqno: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  answered: {
    type: String,
    default: "{\"0\":0,\"1\":0,\"2\":0,\"3\":0,\"4\":0}"
  },
  unanswered: {
    type: String,
    default: "{\"0\":0,\"1\":0,\"2\":0,\"3\":0,\"4\":0}"
  },
});
module.exports = mongoose.model("Test", testSchema);
