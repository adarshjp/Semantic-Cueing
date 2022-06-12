const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    // maxlength: 13,
    // minlength: 13,
    // pattern: "",
  },
  password: {
    type: String,
    // required: true,
    // maxlength: 10,
    // minlength: 8,
    // pattern:
      // "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name:{
    type: String,
    required: true,
  },  
  age:{
    type: Number,
    required: true,
  },
  displaypic: {
    data: Buffer,
    contentType: String,
  },
  status: {    // only for patients active/discharged
    type: String,
    default: "active",
  },
  level: { // only for patients level 1,2,3,4,5
    type: Number,
    default: 1,
    min: 1,
    max: 3,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now,
  },
  strokeDate: {
    type: Date,
  },
  diagnosis: {
    type: String,
  },
  test: [
    {
      score: {
        type: Number,
      },
      answered: {
        type: Object
      },
      unanswered: {
        type: Object
      },
      patient_level: {
        type: Number
      }
    }
  ]
});
userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model("User", userSchema);
