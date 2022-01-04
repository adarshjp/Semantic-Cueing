const User = require('../models/user')
const Question = require('../models/question')
exports.admin_get = (req, res) => {
    User.findById(req.user._id)
        .then((user) => {
            res.render('admin', { user: user })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_patient = (req, res) => {
    //fetch all patients
    User.find({ role: 'patient' })
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_doctor = (req, res) => {
    //fetch all doctors
    User.find({ role: 'doctor' })
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_Oneuser = (req, res) => {
    //fetch one user
    User.findById(req.params.id)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.delete_user = (req, res) => {
    //delete the user with id=req.params.id 
    User.findByIdAndDelete({ _id: req.params.id })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
    
}

exports.get_edit_user = (req, res) => {
    //fetch one patient given id and send it
    User.findById({ _id: req.params.id })
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.edit_user = (req, res) => {
    //update patient with id=req.params.id and data=req.body
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.checkusername=(req, res) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (user) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}