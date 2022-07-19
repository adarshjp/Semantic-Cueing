const User = require('../models/user')
exports.findUserByRole = (role) => {
    return new Promise((resolve, reject) => {
        User.find({ role: role })
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}