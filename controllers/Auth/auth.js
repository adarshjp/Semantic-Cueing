const passport = require("passport");
const User = require("../../models/user");

exports.register_get = (req, res) => {
  User.find({role:'doctor'},{_id:1,name:1},(err,docs)=>{
    if(err){
      res.status(400);
      res.send(err);
    }else{
      res.status(200);
      res.send(docs);
    }
  })
  // res.send("register get");
};

exports.register_post = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    age: req.body.age,
    name: req.body.name,
    email: req.body.email,
  });
  if(req.body.doctorid)
  {
    user.doctorid = req.body.doctorid;
  }
  User.register(user, req.body.password, (err, newUser) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.status(200);
        res.send("User created!");
      });
    }
  });
};

exports.login_get = (req, res) => {
  res.status(200);
  res.send("login");
};

exports.login_post = (req, res) => {
  //res.status(200);
  //res.send("login successful");
  res.redirect("/home/admin")
};

exports.change_password = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      user.changePassword(
        req.body.oldPassword,
        req.body.newPassword,
        (err, user) => {
          if (err) {
            res.status(400);
            res.send(err);
          } else {
            res.status(200);
            res.send("Password changed!");
          }
        }
      );
    }
  });
};

exports.set_password = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      user.setPassword(req.body.password, (err, user) => {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.status(200);
          user.save();
          res.send("Password changed!");
        }
      });
    }
  });
}