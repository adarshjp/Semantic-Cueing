const User = require("../models/user");
const Question = require("../models/question");
const Test = require("../models/test");

exports.get_create_test = (req, res) => {
  let skip = 0;
  if (req.params.skip === undefined) {
    skip = 0;
  }
  else {
    skip = parseInt(req.params.skip);
  }
  console.log(skip);
  User.find({ doctorid: req.user._id }, { _id: 1, name: 1 })
    .then((patient) => {
      Question.find({}, { hints: 0 }).limit(10).skip(skip)
        .then((question) => {
          if (question.length === 0) {
            res.status(200).json({ message: 'No more questions' })
          } else {
            res.status(200)
            if(req.params.skip!==undefined)
              res.json({question: question})
            else 
              res.render('createtest',{question: question, patient: patient,user:req.user,i18n: global.i18n})
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
    User.find({role:'patient',doctorid:req.user._id},{_id:1, name: 1})
    .then((patients) =>{
      res.render("doctor",{user:req.user,patient:patients, i18n:global.i18n})
    })
    .catch((err) => {
      console.log(err)
    })
};

exports.post_create_test = (req, res) => {
  let patientids = JSON.parse(req.body.patientIDs);
  let test = []
  for (let i = 0; i < patientids.length; i++) {
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
    .then((test) => {
      req.flash('success', 'Test created successfully')
      res.status(200)
      res.redirect('/home/doctor/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
};

exports.get_view_assigned_patient= (req, res) => {
  User.find({doctorid:req.user._id})
  .then((users)=>{
    res.render("view_patients",{ user: req.user,patients: users, i18n: global.i18n});
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}

exports.get_patient_details = (req, res) => {
  //get patient details _id is patientid and doctorid is req.user._id
  User.find({ _id: req.params.patientid, doctorid: req.user._id })
    .then((patient) => {
      res.status(200).send(patient);
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

exports.get_patient_test_details = (req, res) => {
  //get patient test details _id is patientid and doctorid is req.user._id
  Test.find({ patientid: req.params.patientid, doctorid: req.user._id }, { _id: 0, questions: 0 })
    .then((test) => {
      res.status(200).send(test);
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

exports.get_view_test_created = (req, res) => {
  Test.find({doctorid:req.user._id})
  .then((tests)=>{
    res.render("view_tests",{ user: req.user,tests: tests, i18n: global.i18n});
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}

exports.get_edit_test= (req, res) => {
  Test.findOne({_id:req.params.testid})
  .then((test)=>{
    res.render("editTest",{ user: req.user,test: test,i18n: global.i18n });
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}


exports.put_edit_test = (req, res) => {
  Test.findOneAndUpdate({ _id: req.params.testid }, { $set: { level: req.body.level, questions: req.body.questions, noofquestion: req.body.questions.length } }, { new: true })
    .then((test) => {
      req.flash('success', 'Test updated successfully')
      res.status(200)
      res.redirect('/view/tests/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

exports.get_question = (req, res) => {
  Question.findById(req.params.questionid, { hints: 0 })
    .then((question) => {
      res.status(200).send(question);
    })
    .catch((err) => {
      res.status(500).json({ message: 'error', error: err })
    })
};

exports.delete_test = (req, res) => {
  Test.findOneAndDelete({ _id: req.params.testid })
    .then((test) => {
      req.flash('success', 'Test deleted successfully')
      res.status(200)
      res.redirect('/view/tests/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}
exports.upgrade_level = (req, res) => {
  /* Updates the level of patient by one */
  User.findOneAndUpdate({ _id: req.params.patientid,role:'patient' }, { $inc: { level: 1 } }, { new: true })
    .then((patient) => {
      console.log(patient)
      req.flash('success', 'Level updated successfully')
      res.status(200)
      res.redirect('/home/doctor/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}
exports.downgrade_level =  (req, res) => {
  /* Updates the level of patient by one */
  User.findOneAndUpdate({ _id: req.params.patientid,role:'patient' }, { $inc: { level: -1 } }, { new: true })
    .then((patient) => {
      console.log(patient)
      req.flash('success', 'Level updated successfully')
      res.status(200)
      res.redirect('/home/doctor/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

exports.discharge_patient = (req, res) => {
  /* Set the status of the patient to discharged */
  User.findOneAndUpdate({ _id: req.params.patientid,role:'patient' }, { $set: { status: 'discharged' } }, { new: true })
    .then((patient) => {
      console.log(patient)
      req.flash('success', 'Patient discharged successfully')
      res.status(200)
      res.redirect('/home/doctor/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}
