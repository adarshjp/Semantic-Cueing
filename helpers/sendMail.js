const {mailTransporter}= require('../setup/nodemailer')
exports.sendMail = (mailDetails) => {
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs" + err);
            //callback(err);
        } else {
            //callback(null, data);
            console.log("Email sent successfully");
        }
    })
}