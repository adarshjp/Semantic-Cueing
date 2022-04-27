const fs = require('fs')
const { dirname } = require('path')
const path = require('path')
const User = require('../models/user')
const Question = require('../models/question')
const Test = require("../models/test");

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
            res.render("view_patients", { user: req.user,patients: users })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_doctor = (req, res) => {
    //fetch all doctors
    User.find({ role: 'doctor' })
        .then((users) => {
            res.render('view_doctors',{doctors:users,user:req.user})
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_Oneuser = (req, res) => {
    //fetch one user
    User.findById(req.params.id)
        .then((user) => {
            res.render("viewOneUser",{user:user,i18n:global.i18n})
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
            res.render("editUser",{user:user,i18n:global.i18n})
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.edit_user = (req, res) => {
    //update patient with id=req.params.id and data=req.body
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((user) => {
            req.flash("success","User updated!!")
            res.redirect("/view/"+req.user._id)
        })
        .catch((err) => {
            req.flash("error","User not updated!!")
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

exports.get_details_for_graph = (req, res) => {
    //fetch all user with role patients or doctors
    User.find({ role: { $in: ['patient', 'doctor'] }},{email: 0,name:0,age:0,username:0})
        .then((users) => {
            res.send({users: users})
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.count_no_of_tests= (req, res) => {
    Test.countDocuments().then((test) => {
        res.send({ test: test })
    }).catch((err) => {
        console.log(err)
    })
}

exports.count_no_of_questions= (req, res) => {
    Question.countDocuments().then((question) => {
        res.send({ question: question })
    }).catch((err) => {
        console.log(err)
    })
}

exports.get_view_questions= (req, res) => {
    let skip=0;
    if(req.params.skip===undefined){
        skip=0;
    }else{
        skip=parseInt(req.params.skip);
    }
    console.log(skip);
    Question.find({}, { hints: 0 }).limit(10).skip(skip)
    .then((question) => {
        if(question.length===0){
            res.status(200).json({message: 'No more questions'})
        }else{
            res.status(200)
            if(req.params.skip!==undefined)
              res.json({question: question})
            else 
              res.render('view_questions',{question: question,user:req.user})
          }
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
        });
    });
}