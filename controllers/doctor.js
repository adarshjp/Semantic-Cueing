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
    User.find({role:'patient',doctorid:req.user._id,status:'active'},{_id:1, name: 1})
    .then((patients) =>{
      res.render("doctor",{user:req.user,patient:patients, i18n:global.i18n})
    })
    .catch((err) => {
      console.log(err)
      res.status(500)
      res.send(err)
    })
};

exports.post_create_test = (req, res) => {
  /* Function to Create new test
     Input : req.body.patientIDs is an array of patient IDs
     Output : Test document added to database
     steps : 1 - The req.body.patientIDs is a string so convert into array.
             2 - Create a test Object.
             3 - Create a field patients array in test object.
             4 - Push Patientids one by one to that array.
             5 - Save test object.
  */
  let patientids = JSON.parse(req.body.patientIDs);
  let newTest = Test({
    doctorid: req.user._id,
    questions: req.body.questions,
    level: req.body.level,
    noofquestion: req.body.questions.length,
  });
  newTest.patients = [];
  for (let i = 0; i < patientids.length; i++) {
    let patient = {
      patientid: patientids[i],
    };
    newTest.patients.push(patient);
  }
  newTest.save()
    .then((test) => {
      req.flash('success', 'Test created successfully')
      res.status(200)
      res.redirect('/view/tests/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({error: err})
  });
}

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
  User.find({ _id: req.params.patientId, doctorid: req.user._id })
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
  /* Function which returns the test details of patient.
     Input : req.params.patientId (patient ID)
     Output : An array of Objects.
     Steps : 1 - Find all those tests in which req.params.patientId is present.
             2 - For each test in the array find the test details of req.params.patientId
             3 - Push that details onto patient_tests array
  */
  Test.find({ 'patients.$.patientid' : req.params.patientId, doctorid: req.user._id }, { patients:1,noofquestion:1 })
    .then((tests) => {
      let patient_tests=[];
      let noofquestion=[];
      tests.forEach((test) => {
        test.patients.forEach((patient) => {
          if (patient.patientid.toString() === req.params.patientId.toString()) {
            patient_tests.push(patient);
          }
        })
        noofquestion.push(test.noofquestion)
      });
      res.status(200).send({patient_tests,noofquestion});
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
    User.find({ doctorid: req.user._id }, { _id: 1, name: 1 })
    .then((patient) => {
      res.render("editTest",{ user: req.user,test: test,patient:patient,i18n: global.i18n });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
  })
  .catch((err)=>{
    res.status(500).json({
      error:err
    })
  })
}


exports.patch_edit_test = (req, res) => {
  let patientids = JSON.parse(req.body.patientIDs);
  let patients = [];
  for (let i = 0; i < patientids.length; i++) {
    patients.push({
      patientid: patientids[i],
    });
  }
  Test.findOneAndUpdate({ _id: req.params.testid }, { $set:{level: req.body.level, questions: req.body.questions, noofquestion: req.body.questions.length, patients:patients}}, { new: true })
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
  User.findOneAndUpdate({ _id: req.params.patientId,role:'patient' }, { $inc: { level: 1 } }, { new: true })
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
  User.findOneAndUpdate({ _id: req.params.patientId,role:'patient' }, { $inc: { level: -1 } }, { new: true })
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
  User.findOneAndUpdate({ _id: req.params.patientId,role:'patient' }, { $set: { status: 'discharged' } }, { new: true })
    .then((patient) => {
      console.log(patient)
      req.flash('success', 'Patient discharged successfully')
      res.status(200)
      res.redirect('/view/patient/' + req.user._id)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}
