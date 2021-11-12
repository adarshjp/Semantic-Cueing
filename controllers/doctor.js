const User = require('../models/user')
const Question = require('../models/question')
exports.get_create_test = (req, res)=>{
    User.find({doctorid:req.user._id})
    .then(patient => {
        Question.find()
        .then(question => {
            res.status(200).json({patient,question})
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
