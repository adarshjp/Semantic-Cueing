const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 13,
    minlength: 13,
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
  },
  role: {
    type: String,
    required: true,
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  testdetails: [
    {
      testid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
      testscore: {
        type: Number,
      },
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model("User", userSchema);
