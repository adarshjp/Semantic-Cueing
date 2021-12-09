const User = require('../models/user')
const Test = require('../models/test')
const Question = require('../models/question')
exports.get_home_patient = (req, res) => {
    User.findById(req.user._id)
        .then((user) => {
            Test.find({ patientid: user._id })
                .then((tests) => {
                    req.app.locals.tests = tests
                    res.status(200).send(JSON.stringify(tests))
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
