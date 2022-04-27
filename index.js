const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride= require("method-override");
const http = require('http').Server(app);
const io = require('socket.io')(http);
var clc = require("cli-color");
app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine","ejs")

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.DB_URL, connectionParams)
  .then(() => {
    console.log(clc.blueBright("\n******** Connected to MongoDB *******"));
    console.log(clc.redBright("\n*************************************"))
  })
  .catch((err) => {
    console.log("NOT CONNECTED to DB!!");
    console.log(err);
  });

const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser(process.env.secret));
app.use(flash());

const User = require("./models/user");
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
}));
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash();
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const adminRoutes = require("./routes/admin");
const generalRoutes = require("./routes/general");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const otpRoutes= require("./routes/otp")
const chatRoutes = require("./routes/chat")
//---------------Multi-language------------------

const fs= require("fs")

app.use(function(req, res, next) {
  if (!req.session.locale && !req.cookies.lang){
    req.session.locale = "en";
    res.cookie('lang', req.session.locale);
  }else if (req.query.locale){
    req.session.locale = req.query.locale;
    res.cookie('lang', req.session.locale);
  }else if(req.cookies.lang && !req.query.locale){
    req.session.locale =  req.cookies.lang;
  }
  const file = "./i18n/" + req.session.locale + ".json";
  fs.readFile(file, (err, data) => {
    if (err) res.send("Error loading language file: " + file);
    else {
      global.i18n = JSON.parse(data);
      next();
    }
  });
});

//-------------End multi language----------------

app.use(adminRoutes)
app.use(generalRoutes)
app.use(doctorRoutes)
app.use(patientRoutes)
app.use(otpRoutes)
app.use(chatRoutes)

const server = http.listen(process.env.PORT || 3000, () => {
  console.log(clc.redBright("\n*************************************"))
  console.log(clc.blueBright("\n**** Server started at port 3000 ****"));
  console.log(clc.cyanBright("\n**** Visit http://localhost:3000 ****"));
  app.emit('appStarted');
});
module.exports = {app,io};


