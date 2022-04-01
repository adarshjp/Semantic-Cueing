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
    res.render('testexecute',{testid: testId, questionIds: questionIds})
}

// exports.post_start_test = (req, res) => {
//     //Update the test score in user model
//     //Update the test status in test model
//     User.findOneAndUpdate({ _id: req.user._id,'testdetails.$.testid':req.params.id },{'testdetails.$.testscore':req.body.testscore})
//         .then((user) => {
//             Test.findOneAndUpdate({ _id: req.params.id }, { status: 'completed' })
//                 .then((test) => {
//                     res.status(200).send('Submitted Test Sucessfully')
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//         })
//         .catch((err) => {
//             console.log(err)
//         })   
    
// }

exports.get_mydoctor = (req, res) => {

    User.findById(req.user.doctorid)
        .then((doctor) => {
            res.render('mydoctor',{ user: req.user,doctor:doctor })
        })
        .catch((err) => {
            console.log(err)
        })
}
exports.get_question = (req, res) => {
    Question.findById(req.params.questionid)
        .then((question) => {
            res.status(200).send(question)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.get_question = (req, res) => {
    Question.findById(req.params.questionid)
        .then((question) => {
            res.status(200).send(question)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.update_test_status = (req, res) => {
    Test.findOneAndUpdate(
        { _id: req.params.id},
        {
            $inc:{pauesdqno:1},status:req.body.status,score:req.body.score,answered:req.body.ans,unanswered:req.body.unans
        },
        { new: true }
        ).then((test) => {
            res.json({ message: "Success"})
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.get_test_details = (req, res) => {
    Test.findById(req.params.id,{questions:0,name:0})
        .then((test) => {
            res.status(200).send(test)
        })
        .catch((err) => {
            console.log(err)
        })
}

