const fs = require('fs')
const { dirname } = require('path')
const path = require('path')
const Question = require('../models/question')
exports.addquestions_get = (req, res) => {
    res.status(200)
    res.render('admin',{user:req.user})
}

exports.addquestions_post = (req, res, next) => {
    //console.log(req.body);
    let img = covert_img(req.files)
    //console.log(img);
    var newQuestion = new Question({
        question: img[0],
        answer: req.body.answer,
        level: req.body.level,
        score: req.body.score,
    })
    newQuestion.hints = []
    //console.log(req.body.nscore);
    for (let i = 0; i < req.body.nscore.length; i++) {
        newQuestion.hints.push({
            hint: img[i + 1],
            score: req.body.nscore[i],
        })
    }
    //console.log(newQuestion);
    newQuestion
        .save()
        .then((result) => {
            //console.log(result);
            req.flash('success', 'Question added successfully')
            res.status(200)
            res.redirect('/home/admin')
        })
        .catch((err) => {
            res.status(500)
            req.flash('error', err.message)
            res.redirect('/home/admin')
        })
}
exports.view_question = (req, res) => {
    //fetch all questions
    Question.find({})
        .then((questions) => {
            res.send(questions)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.view_Onequestion = (req, res) => {
    //fetch one question given id and send it
    Question.findById({ _id: req.params.id })
        .then((question) => {
            res.send(question)
        })
        .catch((err) => {
            console.log(err)
        })
}
function covert_img(files) {
    let img = []
    files.forEach((file) => {
        var obj = {
            data: fs.readFileSync(
                path.join(__dirname + '\\..\\uploads\\' + file.filename)
            ),
            contentType: 'image/png',
        }
        img.push(obj)
    })
    return img
}
