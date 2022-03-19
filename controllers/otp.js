const otp = require("../models/otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const user = require("../models/user");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS,
  },
});
let mailDetails = {
  from: process.env.EMAIL_ID,
  subject: "OTP for verification",
};
var algorithm = process.env.algorithm; // or any other algorithm supported by OpenSSL
var iv = new Buffer.from(crypto.randomBytes(16));
var ivstring = iv.toString("hex").slice(0, 16);
const secret = process.env.secret;
let key = crypto
  .createHash("sha256")
  .update(String(secret))
  .digest("base64")
  .substr(0, 32);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

exports.sendOtp = (req, res) => {
  const newOtp = new otp({
    otp: Math.floor(100000 + Math.random() * 900000),
    isVerified: false,
    creationTime: Date.now(),
    verificationKey:req.body.verificationKey
  });
  let version = req.params.version;
  let userid;
  if (version === "v1") {
    userid = findUserId(req.body.email, res, (id) => {
      userid = id;
      if (userid == -1) {
        console.log("User not found");
        res.json({ message: "User not found" });
      } else {
        sendotp(req.params.via, req.body.email, newOtp, req.body.phone, res);
      }
    });
  } else {
    sendotp(req.params.via, req.body.email, newOtp, req.body.phone, res);
  }
};
exports.verifyOtp = (req, res) => {
  var encrypted =enccodeOtp(req.body.otp)
  otp.findOne({ otp: encrypted, isVerified: false,verificationKey:req.body.verificationKey }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    } else {
      if (data) {
        var min = Math.floor(Date.now() - data.creationTime) / 60000;
        if (min <= 10) {
          data.verified = true;
          data.save();
          res.message = "OTP verified";
          res.json({ message: "Sucesss" });
        } else {
          res.json({ message: "OTP expired" });
        }
      } else {
        res.json({ message: "OTP not found" });
      }
    }
  });
};
function initSendMail(email, otp, res) {
  mailDetails.to = email;
  mailDetails.html =
    "<h1>OTP for verification</h1><h2>Your OTP is " +
    otp +
    ".This OTP is valid for 10 minutes.</h2><h3>Thank You</h3>";
  sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ message: "Error Occured" });
    } else {
      console.log("Email sent successfully");
    }
  });
}
function sendMail(mailDetails, callback) {
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs" + err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
}
function initSendSms(phone, otp, res) {
  var msg = "Your OTP is " + otp + ".This OTP is valid for 10 minutes.";
  sendSms("+91" + phone, msg);
  console.log("SMS sent successfully");
}
//+91 required
function sendSms(phone, message) {
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
}
function enccodeOtp(otp) {
  var cipher = crypto.createCipheriv(algorithm, key, ivstring);
  var encrypted = cipher.update(otp, "utf8", "hex") + cipher.final("hex");
  return encrypted;
}
function findUserId(email, res, callbackFindUserId) {
  let userId = -1;
  user.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    } else {
      if (data) {
        userId = data.id;
        console.log(userId);
        callbackFindUserId(userId);
      } else {
        callbackFindUserId(userId);
      }
    }
  });
}
function sendotp(via, email, newOtp, phone, res) {
  if (via === "email") {
    initSendMail(email, newOtp.otp, res);
  } else if (via === "sms") {
    initSendSms(phone, newOtp.otp, res);
  }
  newOtp.otp = enccodeOtp(newOtp.otp);
  newOtp.save();
  res.json({ message: "Sucesss" });
}
