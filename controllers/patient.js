const User = require('../models/user')
const Test = require('../models/test')
const Question = require('../models/question')
exports.get_home_patient = (req, res) => {
    User.findById(req.user._id)
        .then((user) => {
            Test.find({ patientid: user._id })
                .then((tests) => {
                    req.app.locals.tests = tests
                    res.render('patient',{ user: user,tests: tests })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.get_start_test = (req, res) => {
    let testId = req.params.id
    let testObject = req.app.locals.tests.find((test) => test._id == testId)
    let questionIds = testObject.questions
    Question.find({ _id: { $in: questionIds } })
        .then((questions) => {
            console.log(questions.length)
            res.status(200).send(JSON.stringify(questions))
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.post_start_test = (req, res) => {
    //Update the test score in user model
    //Update the test status in test model
    User.findOneAndUpdate({ _id: req.user._id,testdetails:{$eleMatch:{testid:req.params.id}} },{'testdetails.$.testscore':req.body.testscore})
        .then((user) => {
            Test.findOneAndUpdate({ _id: req.params.id }, { status: 'completed' })
                .then((test) => {
                    res.status(200).send(JSON.stringify(test))
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })   
    
}