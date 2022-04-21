const User = require("../models/user");
const Question = require("../models/question");
const Test = require("../models/test");

exports.get_create_test = (req, res) => {
  let skip=0;
  if(req.params.skip===undefined)
  {
    skip=0;
  }
  else
  {
    skip=parseInt(req.params.skip);
  }
  console.log(skip);
  User.find({ doctorid: req.user._id }, { _id: 1, name: 1 })
    .then((patient) => {
      Question.find({}, { hints: 0 }).limit(5).skip(skip)
        .then((question) => {
          if(question.length===0)
          {
            res.status(200).json({message: 'No more questions'})
          }else{
            res.status(200)
            if(req.params.skip!==undefined)
              res.json({question: question})
            else 
              res.render('createtest',{question: question, patient: patient,user:req.user})
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_home_doctor = (req, res) => {
  User.findById({_id:req.user._id})
  .then((user)=>{
    User.find({role:'patient',doctorid:req.user._id},{_id:1, name: 1})
    .then((patients) =>{
      res.render("doctor",{user:user,patient:patients})
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
  
};

exports.post_create_test = (req, res) => {
  let patientids=JSON.parse(req.body.patientIDs);
  let test=[]
  for(let i=0;i<patientids.length;i++)
  {
    let newTest = Test({
      doctorid: req.user._id,
      patientid: patientids[i],
      questions: req.body.questions,
      level: req.body.level,
      noofquestion: req.body.questions.length,

    });
    test.push(newTest);
  }
  Test.insertMany(test)
  .then((test)=>{
    req.flash('success', 'Test created successfully')
    res.status(200)
    res.redirect('/home/doctor/'+req.user._id)
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
};

exports.get_view_assigned_patient= (req, res) => {
  User.find({doctorid:req.user._id})
  .then((users)=>{
    res.render("view_patients",{ user: req.user,patients: users });
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}

exports.get_patient_details = (req, res) => {
  //get patient details _id is patientid and doctorid is req.user._id
  User.find({_id:req.params.patientid,doctorid:req.user._id})
  .then((patient)=>{
    res.status(200).send(patient);
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}

exports.get_patient_test_details = (req, res) => {
  //get patient test details _id is patientid and doctorid is req.user._id
  Test.find({patientid:req.params.patientid,doctorid:req.user._id},{_id:0,questions:0})
  .then((test)=>{
    res.status(200).send(test);
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}