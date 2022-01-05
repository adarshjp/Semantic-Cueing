const otp = require('../models/otp')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const user = require('../models/user')
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS,
  },
})
let mailDetails = {
  from: process.env.EMAIL_ID,
  subject: 'OTP for verification',
}
var algorithm = process.env.algorithm // or any other algorithm supported by OpenSSL
var iv = new Buffer.from(crypto.randomBytes(16))
var ivstring = iv.toString('hex').slice(0, 16)
const secret = process.env.secret
let key = crypto
  .createHash('sha256')
  .update(String(secret))
  .digest('base64')
  .substr(0, 32)
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
exports.sendOtp = (req, res) => {
  console.log('Sending OTP...')
  const newOtp = new otp({
    otp: Math.floor(100000 + Math.random() * 900000),
    isVerified: false,
    creationTime: Date.now(),
  })
  let via = req.params.via
  if (via === 'email') {
    mailDetails.to = req.body.email
    mailDetails.html =
      '<h1>OTP for verification</h1><h2>Your OTP is ' +
      newOtp.otp +
      '.This OTP is valid for 10 minutes.</h2><h3>Thank You</h3>'
    sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err)
        res.json({ message: 'Error Occured' })
      } else {
        console.log('Email sent successfully')
      }
    })
  } else if (via === 'sms') {
    var phone = req.body.phone
    var msg = 'Your OTP is ' + newOtp.otp + '.This OTP is valid for 10 minutes.'
    sendSms('+91' + phone, msg)
    console.log('SMS sent successfully')
  }
  var cipher = crypto.createCipheriv(algorithm, key, ivstring)
  var encrypted = cipher.update(newOtp.otp, 'utf8', 'hex') + cipher.final('hex')
  newOtp.otp = encrypted
  newOtp.save()
  res.json({ message: 'Sucesss' })
}
exports.verifyOtp = (req, res) => {
  var entered_otp = req.body.otp
  var cipher = crypto.createCipheriv(algorithm, key, ivstring)
  var encrypted =
    cipher.update(entered_otp, 'utf8', 'hex') + cipher.final('hex')
  otp.findOne({ otp: encrypted, isVerified: false }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data) {
        var min = Math.floor(Date.now() - data.creationTime) / 60000
        if (min <= 10) {
          data.verified = true
          data.save()
          res.message = 'OTP verified'
          res.json({ message: 'Sucesss' })
        } else {
          res.json({ message: 'OTP expired' })
        }
      } else {
        res.json({ message: 'OTP not found' })
      }
    }
  })
}
function sendMail(mailDetails, callback) {
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs' + err)
      callback(err)
    } else {
      callback(null, data)
    }
  })
}
//+91 required
function sendSms(phone, message) {
  const client = require('twilio')(accountSid, authToken)
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error))
}
