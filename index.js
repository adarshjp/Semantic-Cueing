const express = require("express");
const app = express();
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride= require("method-override");
const http = require('http').Server(app);
const io = require('socket.io')(http);
var clc = require("cli-color");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {dbSetup} = require("./setup/db");
const adminRoutes = require("./routes/admin");
const generalRoutes = require("./routes/general");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const otpRoutes= require("./routes/otp")
const chatRoutes = require("./routes/chat")
const User = require("./models/user");
const {i18n} = require("./setup/i18n");

app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine","ejs")
app.use(cookieParser(process.env.secret));
app.use(flash());
dbSetup()
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
app.use(i18n);
app.use(generalRoutes);
app.use(adminRoutes)
app.use(doctorRoutes)
app.use(patientRoutes)
app.use(otpRoutes)
app.use(chatRoutes)

const server = http.listen(process.env.PORT || 3000, () => {
  console.log("Starting Server in "+process.env.NODE_ENV+" environment");
  console.log(clc.redBright("\n*************************************"))
  console.log(clc.blueBright("\n**** Server started at port 3000 ****"));
  console.log(clc.cyanBright("\n**** Visit http://localhost:3000 ****"));
  app.emit('appStarted');
});
module.exports = {app,io};


