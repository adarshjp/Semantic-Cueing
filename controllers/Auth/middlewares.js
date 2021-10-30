const user = require("../../models/user");

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

exports.isDoctor = (req, res, next) => {
  if (req.user.role === "doctor") {
    return next();
  } else {
    res.status(401);
    res.send("You must be a doctor to do that!");
    // req.flash('error','You must be a doctor to do that!');
    // res.redirect('/');
  }
};

exports.isPatient = (req, res, next) => {
  if (req.user.role === "patient") {
    return next();
  } else {
    res.status(401);
    res.send("You must be a patient to do that!");
    // req.flash('error','You must be a patient to do that!');
    // res.redirect('/');
  }
};

exports.isMappedDoctor = (req, res, next) => {
  User.findbyId({ _id: req.params.id }, { doctorid: 1 })
    .then((user) => {
      if (user.doctorid === req.user._id) {
        return next();
      } else {
        res.status(401);
        res.send("You are not authorized to do that!");
        // req.flash('error','You are not authorized to do that!');
        // res.redirect('/');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
