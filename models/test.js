const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
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
    default: -1,
  },
});
module.exports = mongoose.model("Test", testSchema);
