const passport = require("passport");
const User = require("../models/user");
const {convert_img}= require('../helpers/convert_img')

exports.register_get = (req, res) => {
  User.find({ role: 'doctor' }, { _id: 1, name: 1, }, (err, docs) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.render('signup', { doctors: docs,user:req.user,i18n:global.i18n});
    }
  })
};

exports.register_post = (req, res) => {
  let img= convert_img(req.files)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    age: req.body.age,
    name: req.body.name,
    email: req.body.email,
    displaypic: img[0],
    strokeDate: req.body.strokeDate,
    diagnosis: req.body.diagnosis,
  });
  if (user.role === 'patient' && req.body.doctorid) {
    user.doctorid = req.body.doctorid;
  }
  // console.log(user);
  User.register(user, req.body.password, (err, newUser) => {
    if (err) {
      res.status(400);
      req.flash("error", err.message)
      res.redirect("/register");
    } else {
      res.status(200);
      req.flash("success", global.i18n.Usercreated)
      res.redirect("/register");
    }
  });
};

exports.login_get = (req, res) => {
  res.status(200);
  res.render("login",{i18n:global.i18n});
};

exports.login_post = (req, res) => {
  res.status(200);
  //res.send("login successful");
  req.flash("success", global.i18n.Welcome)
  if (req.user.role === "admin")
    res.redirect("/home/admin")
  else if (req.user.role === "doctor")
    res.redirect("/home/doctor/" + req.user._id)
  else
    res.redirect("/home/patient/" + req.user._id)
};
exports.get_changepassword = (req, res) => {
  res.status(200);
  res.render("changePassword", { user: req.user, i18n: global.i18n });
}
exports.change_password = (req, res) => {

  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.status(400);
      req.flash('error', err.message);
      res.redirect("/changepassword")
      // res.send(err);
    } else {
      user.changePassword(req.body.oldPassword, req.body.newPassword, (err, user) => {
        if (err) {
          res.status(400);
          req.flash('error', err.message);
          res.redirect("/changepassword")
          // res.send(err);
        } else {
          res.status(200);
          req.flash('success', global.i18n.Passwordchanged);
          res.redirect("/changepassword")
        }
      });
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

exports.set_post = (req, res) => {
  //given email and update the password
  User.findOne({ email: req.body.email }, (err, user) => {
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
          res.json({ message: "Password changed!" });
        }
      });
    }
  })
}