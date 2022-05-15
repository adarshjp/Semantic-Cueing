
const User = require('../../models/user')
const Test = require('../../models/test')
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status(401)
        // res.send("You must be logged in to do that!");
        // req.flash('error','You must be logged in to do that!');
        res.redirect('/login')
    }
}
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next()
    } else {
        res.status(401)
        res.send('You must be an admin to do that!')
        // req.flash('error','You must be an admin to do that!');
        // res.redirect('/');
    }
}

exports.isDoctor = (req, res, next) => {
    if (req.user.role === 'doctor') {
        return next()
    } else {
        res.status(401)
        res.send('You must be a doctor to do that!')
        // req.flash('error','You must be a doctor to do that!');
        // res.redirect('/');
    }
}

exports.isPatient = (req, res, next) => {
    if (req.user.role === 'patient') {
        return next()
    } else {
        res.status(401)
        res.send('You must be a patient to do that!')
        // req.flash('error','You must be a patient to do that!');
        // res.redirect('/');
    }
}

exports.isMappedDoctor = async (req, res, next) => {
    let doctorId, patinetId=req.params.patientid
    /*Check whether the req.user._id is same as doctorid of patient */
    try{
        doctorId=await findDoctorIdByPatientId(patinetId)
        if(req.user._id.toString()===doctorId.toString()){
            return next()
        }
        else{
            res.status(401)
            res.send('You are not mapped to this patient!')
            // req.flash('error','You are not mapped to this patient!');
            // res.redirect('/');
        }
    }
    catch(err){
        res.status(500).send(err)
    }

}
function findDoctorIdByPatientId(patientId){
    /* Function should return the  doctor id for a patient id that is passed as an argument
        Input: patientId
        Output: doctorId
    */
    return new Promise((resolve, reject) => {
        User.findById(patientId, (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                if(!user) {
                    reject("No user found!")
                }else{
                    resolve(user.doctorid)
                }
            }
        })
    })
}
exports.isTestAssigned = (req, res, next) => {
    //req.params.id is the test id
    //here we check if the test is assigned to the patient
    Test.findById({ _id: req.params.id, patientid: req.user._id })
        .then((test) => {
            if (test) {
                //if the test is assigned to the patient
                return next()
            } else {
                //if the test is not assigned to the patient
                res.status(401)
                res.send('You are not authorized to do that!')
                // req.flash('error','You are not authorized to do that!');
                // res.redirect('/');
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.isTestCompleted = (req, res, next) => {
  //Check the status of test given testid
  //if the test is completed then allow the user to view the report
  Test.findById({ _id: req.params.id })
    .then((test) => {
      if (test.status === 'completed') {
        res.send("You have already completed the test!")
      } else {
        return next()
      }
    })
}

exports.isQuestionInTest = (req, res, next) => {
    //req.params.id is the test id
    //req.params.questionid is the question id
    //check whether the question exists in the test
    Test.findById({ _id: req.params.id })
        .then((test) => {
            if (test.questions.includes(req.params.questionid)) {
                return next()
            } else {
                res.status(401)
                res.send('You are not authorized to do that!')
                // req.flash('error','You are not authorized to do that!');
                // res.redirect('/');
            }
        })
}

