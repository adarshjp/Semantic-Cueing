const User = require("../models/user");
const Test = require("../models/test")
exports.get_home_patient = (req, res) => {
  User.findById(req.user._id)
  .then(user => {
    Test.find({patientid:user._id})
    .then(tests => {
      res.status(200).send(JSON.stringify(tests));
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  });
};


