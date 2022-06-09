const Question = require('../models/question')
const Test = require('../models/test')
const {convert_img}= require('../helpers/convert_img')
exports.addquestions_get = (req, res) => {
    res.status(200)
    res.render('add_questions',{user: req.user,i18n: global.i18n})
}

exports.addquestions_post = (req, res, next) => {
    //console.log(req.body);
    let img = convert_img(req.files)
    //console.log(img);
    var newQuestion = new Question({
        name:req.body.name,
        question: img[0],
        answer: JSON.parse(req.body.answer),
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
            req.flash('success', global.i18n.Questionaddedsuccessfully)
            res.status(200)
            res.redirect('/view/questions')
        })
        .catch((err) => {
            res.status(500)
            req.flash('error', err.message)
            res.redirect('/view/questions')
        })
}
exports.view_question = (req, res) => {
    //fetch all questions
    Question.find({})
        .then((questions) => {
            res.send(questions)
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
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
            res.status(500)
            res.send(err)
            console.log(err)
        })
}
exports.forgotpassword_get= (req, res) => {
    res.render('forgotpassword',{i18n: global.i18n})
}
exports.get_edit_question= (req, res) => {
    Question.findById({ _id: req.params.questionid })
        .then((question) => {
            res.render("edit_question",{question:question,user:req.user,i18n: global.i18n})
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}
exports.put_edit_question= async (req, res) => {
    /* Function which edits the question expect hints */
    /* 
        Parameters:questionid
        Body:name,answer,level,score
        Files:0 or 1 
        Steps:  1.Check whether req.files is empty or not
                2.If not empty then convert the files to buffer
                3.If empty then do nothing
                4.Update the question
                5.Send the updated question
    */
    let img
    let newQuestion={
        name:req.body.name,
        answer:JSON.parse(req.body.answer),
        level:req.body.level,
        score:req.body.score,
    }
    if(req.files.length!=0){
        img = convert_img(req.files)
        newQuestion.question = img[0]
    }
    let updatedQuestion=await updateQuestion(req.params.questionid,newQuestion)
    req.flash('success', global.i18n.Questionupdatedsuccessfully)
    res.status(200)
    res.redirect('/edit/question/'+req.params.questionid)
}
exports.put_edit_hint= async(req, res) => {
    /* Function which edits the hints of the question */
    /*
        Parameters:questionid,hintid
        Body:score
        Files:0 or 1
        Steps:  1.Check whether req.files is empty or not
                2.If not empty then convert the files to buffer
                3.If empty then do nothing
                4.Update the hint
                5.Send the updated hint
    */
    let img
    let newHint={
        score:req.body.score,
    }
    if(req.files.length!=0){
        img = convert_img(req.files)
        newHint.hint = img[0]
    }
    if(newHint.hint==undefined){
        let hints=await fetchImg(req.params.questionid,req.params.hintid)
        hints.forEach((hint)=>{
            if(hint._id==req.params.hintid){
                newHint.hint=hint.hint
            }
        })
    }
    // res.send(newHint)
    let updatedHint=await updateHint(req.params.questionid,req.params.hintid,newHint)
    req.flash('success', global.i18n.Hintupdatedsuccessfully)
    res.status(200)
    res.redirect('/edit/question/'+req.params.questionid)
}
function updateQuestion(questionid,newQuestion)
{
    return new Promise((resolve,reject)=>{
        Question.findByIdAndUpdate({_id:questionid},newQuestion)
        .then((question)=>{
            resolve(question)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
function updateHint(questionid,hintid,newHint)
{
    //console.log(newHint)
    return new Promise((resolve,reject)=>{
        Question.findOneAndUpdate({_id:questionid,'hints._id':hintid},{$set:{'hints.$':newHint}},{new:true})
        .then((question)=>{
            resolve(question)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

function fetchImg(questionid,hintid)
{
    return new Promise((resolve,reject)=>{
        Question.findOne({_id:questionid,'hints.$._id':hintid})
        .then((question)=>{
            //console.log(question.hints)
            resolve(question.hints)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

exports.delete_question= (req, res) => {
    Test.find({questions:req.params.questionid},{_id:1})
    .then(test => {
        if(test.length===0){
            Question.findByIdAndDelete({ _id: req.params.questionid })
            .then((question) => {
                req.flash('success', global.i18n.Questiondeletedsuccessfully)
                res.status(200)
                res.redirect('/view/questions')
            })
            .catch((err) => {
                res.status(500)
                res.send(err)
                console.log(err)
            })
        }else{
            req.flash('error', global.i18n.QuestionisUsedinatest)
            res.status(200)
            res.redirect('/view/questions')
        }
    })
    .catch(err => {
        res.status(500)
        res.send(err)
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
    Question.find({}, { hints: 0 }).limit(10).skip(skip)
    .then((question) => {
        if(question.length===0){
            if(req.params.skip===undefined){
                res.render('view_questions',{question: question,user:req.user,i18n: global.i18n})
            }else{
                res.status(200).json({message: 'No more questions'})
            }
        }else{
            res.status(200)
            if(req.params.skip!==undefined)
              res.json({question: question})
            else 
              res.render('view_questions',{question: question,user:req.user,i18n: global.i18n})
          }
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
        });
    });
}   
