const User = require('../models/user')
const Question = require('../models/question')
exports.admin_get = (req, res) => {
    User.findById(req.user._id)
        .then((user) => {
            res.send(user)
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

exports.view_Onedoctor = (req, res) => {
    //fetch one doctor given id and send it
    User.findById({_id:req.params.id,role:'doctor'})
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_Onepatient = (req, res) => {
    //fetch one patient given id and send it
    User.findById({_id:req.params.id,role:'patient'})
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

