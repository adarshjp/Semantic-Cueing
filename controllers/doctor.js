const User = require('../models/user')
const Question = require('../models/question')
const Test = require('../models/test')
exports.get_create_test = (req, res)=>{
    User.find({doctorid:req.user._id},{_id:1,name:1})
    .then(patient => {
        Question.find({},{hints:0})
        .then(question => {
            res.status(200).send({patient,question})
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        }
        )
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    }
    )
}
exports.get_home_doctor = (req, res)=>{
    res.status(200).send('home doctor')
}
exports.post_create_test = (req, res)=>{
    const newTest=Test({
        doctorid:req.user._id,
        patientid:req.body.patientid,
        questions:req.body.questions,
        level:req.body.level,
        noofquestion: req.body.questions.length,
    })
    //console.log(newTest)
    newTest.save()
    .then(result => {
        res.status(201).json({
            message: 'Test created successfully',
            result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    }
    )
}
