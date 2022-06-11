const User = require('../models/user')
exports.findUserById=(userId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })   
    })   
}