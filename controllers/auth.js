const passport = require("passport");
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
  res.status(200);
  res.send("register get");
};

exports.register_post = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: "admin",
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
