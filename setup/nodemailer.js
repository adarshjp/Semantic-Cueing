const nodemailer = require("nodemailer")
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASS,
    },
});
let mailDetails = {
    from: process.env.EMAIL_ID,
};
module.exports={mailDetails,mailTransporter}