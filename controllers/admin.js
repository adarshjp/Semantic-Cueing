const User=require('../models/user');
exports.admin_get = (req, res) => {
  res.status(200);
  res.send("admin");
};

