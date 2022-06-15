const User = require('../models/user')
exports.findAndDeleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(userId)
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}