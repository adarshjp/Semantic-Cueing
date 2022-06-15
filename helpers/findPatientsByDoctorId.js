const User = require('../models/user')
exports.findPatientsByDoctorId = (doctorId) => {
    return new Promise((resolve, reject) => {
        User.find({ doctorid: doctorId, role: 'patient' })
            .then((user) => {
                resolve(user)
            }).catch((err) => {
                reject(err)
            });
    })
}