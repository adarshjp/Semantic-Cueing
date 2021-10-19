const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401);
    res.send("You must be logged in to do that!");
    // req.flash('error','You must be logged in to do that!');
    // res.redirect('/login');
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  } else {
    res.status(401);
    res.send("You must be an admin to do that!");
    // req.flash('error','You must be an admin to do that!');
    // res.redirect('/');
  }
};

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
  });
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
  res.status(200);
  res.send("login successful");
};

exports.admin_get = (req, res) => {
  res.status(200);
  res.send("admin");
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