const Question = require('../models/question')
const Test = require('../models/question')
const {convert_img}= require('./convert_img')
exports.addquestions_get = (req, res) => {
    res.status(200)
    res.render('add_questions',{user: req.user,i18n: global.i18n})
}

exports.addquestions_post = (req, res, next) => {
    //console.log(req.body);
    let img = convert_img(req.files)
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
exports.forgotpassword_get= (req, res) => {
    res.render('forgotpassword',{i18n: global.i18n})
}

function covert_img(files) {
    let img = []
    files.forEach((file) => {
        var obj = {
            data: fs.readFileSync(
                path.join(__dirname + '//..//uploads//' + file.filename)
            ),
            contentType: 'image/png',
        }
        img.push(obj)
    })
    return img
}
exports.get_edit_question= (req, res) => {
    Question.findById({ _id: req.params.questionid })
        .then((question) => {
            res.render("edit_question",{question:question,user:req.user,i18n: global.i18n})
        })
        .catch((err) => {
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
        answer:req.body.answer,
        level:req.body.level,
        score:req.body.score,
    }
    if(req.files.length!=0){
        img = covert_img(req.files)
        newQuestion.question = img[0]
    }
    let updatedQuestion=await updateQuestion(req.params.questionid,newQuestion)
    req.flash('success', 'Question updated successfully')
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
        img = covert_img(req.files)
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
    req.flash('success', 'Hint updated successfully')
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
                req.flash('success', 'Question deleted successfully')
                res.status(200)
                res.redirect('/view/question')
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            req.flash('error', 'Question is Used in a test')
            res.status(200)
            res.redirect('/view/question')
        }
    })
    .catch(err => {
        console.log(err)
    })

}           
