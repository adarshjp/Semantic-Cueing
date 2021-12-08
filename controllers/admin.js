const User=require('../models/user');
exports.admin_get = (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send(user);
  })
  .catch((err) => {
    console.log(err);
  })
};

