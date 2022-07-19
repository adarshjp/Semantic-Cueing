const User = require('../models/user')
exports.findAndUpdateUserById = (userId, update) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userId, update)
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}