const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine","ejs")
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.DB_URL, connectionParams)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("NOT CONNECTED to DB!!");
    console.log(err);
  });

const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

const User = require("./models/user");
app.use(
  require("express-session")({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash();
  next();
});

app.get("/test",(req,res)=>{
  res.render("login");
  })

const adminRoutes = require("./routes/admin");
const generalRoutes = require("./routes/general");
app.use(adminRoutes)
app.use(generalRoutes)
app.listen(process.env.PORT || 3000, () => {
  console.log("server started at port 3000");
});
