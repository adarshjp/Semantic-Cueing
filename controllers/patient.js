const User = require('../models/user')
const Test = require('../models/test')
const Question = require('../models/question')
let { mailDetails } = require('../setup/nodemailer')
const { sendMail } = require('../helpers/sendMail')
const ejs= require("ejs")

exports.get_home_patient = (req, res) => {
    /* Gets the list of tests assigned to the patient 
        Input : req.params.id - patient id
        Output : list of tests assigned to the patient
        Steps :  1 - get the list of tests assigned to the patient
                 2 - find the patient details with patientid===req.params.id( is pushed onto patient_tests array)
                 3 - Level of the test is added to the patient_test object
                 4 - render the home page of the patient
    */
    Test.find({ 'patients.$.patientid' : req.user._id})
        .then((tests) => {
            let patient_tests=[];
            tests.forEach((test) => {
                test.patients.forEach((patient) => {
                    if (patient.patientid.toString() === req.params.id.toString()) {
                        patient._id = test._id;
                        Object.assign(patient, {level: test.level});
                        Object.assign(patient, {noofquestion: test.noofquestion});
                        Object.assign(patient, {name: test.name});
                        patient_tests.push(patient);
                    }
                })
            });
            req.app.locals.tests = tests;
            res.render('patient',{ user: req.user,tests: patient_tests, i18n:global.i18n })
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}
        
exports.get_start_test = (req, res) => {
    let testId = req.params.id
    let testObject = req.app.locals.tests.find((test) => test._id == testId)
    let questionIds = testObject.questions
    res.render('testexecute',{testid: testId, questionIds: questionIds, i18n:global.i18n})
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
            res.render('mydoctor',{ user: req.user,doctor:doctor,i18n:global.i18n })
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

exports.get_question = (req, res) => {
    Question.findById(req.params.questionid)
        .then((question) => {
            res.status(200).send(question)
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

exports.get_question = (req, res) => {
    Question.findById(req.params.questionid)
        .then((question) => {
            res.status(200).send(question)
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

exports.update_test_status = (req, res) => {
    Test.findOneAndUpdate(
        {   _id:req.params.id,
            'patients.patientid':req.user._id
        },
        {
            $inc:{'patients.$.pauesdqno':1},
            'patients.$.status':req.body.status,
            'patients.$.score':req.body.score,
            'patients.$.answered':req.body.ans,
            'patients.$.unanswered':req.body.unans,
             status:'paused'
        },
        { new: true }
        ).then((test) => {
            check_all_patients_status(req.params.id)
            if(req.body.status == 'completed'){
                test.patients.forEach((patient) => {
                    if (patient.patientid.toString() === req.user._id.toString()) {
                        Object.assign(patient, {noofquestion: test.noofquestion});
                        send_Test_Result(patient,req.user.email,res)
                    }
                })
            }
            res.json({ message: "Success"})
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        });
}

function check_all_patients_status(testid) {
    /* Checks if all the patients have completed the test
        Input : testid - test id
        Output : updates the test status in test with test id === testid
        Steps :  1 - find the test with testid === testid
                 2 - if all the patients have completed the test, update the test status to completed
    */
    Test.findById(testid)
        .then((test) => {
            let isCompleted = true;
            test.patients.forEach((patient) => {
                if (patient.status !== 'completed') {
                    isCompleted = false;
                }
            });
            if(isCompleted){
                Test.findByIdAndUpdate(testid, { status: 'completed' })
                .then(() => {
                    console.log('All patients Test Completed')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
}

exports.get_test_details = (req, res) => {
    /* Gets initial details test Status of the Patient 
       Input : req.params.id - test id
       Output : test status of the patient
       Steps :  1 - get the test details with testid===req.params.id and patientid===req.user._id
                2 - Send the patient with patientid===req.user._id
    */
    Test.find({_id:req.params.id,'patients.$.patientid':req.user_id},{questions:0,name:0})
        .then((test) => {
            test[0].patients.forEach((patient) => {
                if (patient.patientid.toString() === req.user._id.toString()) {
                    res.status(200).send(patient)
                }
            })
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

function send_Test_Result(test,to_emailId,res){
    ejs.renderFile(__dirname+"\\..\\views\\res_Email.ejs",{test:test},(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                message:"Internal server error"
            })
        }else{
            mailDetails.to = to_emailId;
            mailDetails.html = data;
            mailDetails.subject = "Test Result";
            sendMail(mailDetails);
        }
    })
}
