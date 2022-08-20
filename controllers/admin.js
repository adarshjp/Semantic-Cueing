const User = require('../models/user')
const Question = require('../models/question')
const Test = require("../models/test");
const { findUserByRole } = require('../helpers/findUserByRole')
const { findUserById } = require('../helpers/findUserById')
const { findAndDeleteUserById } = require('../helpers/findAndDeleteUserById')
const { findPatientsByDoctorId } = require('../helpers/findPatientsByDoctorId')
const {findAndUpdateUserById}= require('../helpers/findAndUpdateUserById')
exports.admin_get = async (req, res) => {
    //Function to render the admin home page
    res.render('admin', { user: req.user, i18n: global.i18n })
}

exports.view_patient = async (req, res) => {
    //Function to render a page which displays all the patients
    try {
        let patients = await findUserByRole('patient')
        res.render('view_patients', { patients: patients, user: req.user, i18n: global.i18n })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.view_doctor = async (req, res) => {
    //Function to render a page which displays all the doctors
    try {
        let doctors = await findUserByRole('doctor')
        res.render('view_doctors', { doctors: doctors, user: req.user, i18n: global.i18n })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.view_Oneuser = async (req, res) => {
    //Function to render a page which displays one user
    try {
        let user = await findUserById(req.params.id)
        res.render('viewOneUser', { user: user, i18n: global.i18n })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.delete_user = async (req, res) => {
    //Function to delete a user with _id=req.params.id
    //Here, we delete patient and doctor user in a  different way
    // Doctor:
    // 1. Check whether the doctor has any patient 
    // 2. If yes, you cannot delete that doctor 
    // 3. If no, you can delete that doctor
    // 4. Delete all the tests from the doctor
    // Patient:
    // 1. Delete the patient
    // 2. Unassign the patient from all the tests
    let user = await findUserById(req.params.id)
    try {
        if (user.role == 'doctor') {
            await findAndDeleteDoctor(req.params.id)
            req.flash('success', global.i18n.Doctorisdeletedsuccessfully)
            res.status(200)
            res.redirect('/view/doctor')
        } else if (user.role == 'patient') {
            await findAndDeletePatient(req.params.id)
            req.flash('success', global.i18n.Patientisdeletedsuccessfully)
            res.status(200)
            res.redirect('/view/patient')
        } else {
            res.status(500).send('Invalid user role')
        }
    } catch (err) {
        if (err.message == 'Doctor has patients') {
            req.flash('error', global.i18n.DoctorhaspatientsPleasedeletethemfirst)
            res.status(200)
            res.redirect('/view/doctor')
        } else {
            console.log(err)
            res.status(500).send(err)
        }
    }
}
async function findAndDeletePatient(id) {
    await findAndDeleteUserById(id)
    await find_And_Update_Test_Status(id)
    await unassign_patient_from_all_test(id)
}
async function findAndDeleteDoctor(id) {
    //1.Check whether the doctor has any patients 
    //2.If yes, you cannot delete that doctor
    //3.If no, you can delete that doctor
    //4.Delete all the tests from the doctor
    let patients = await findPatientsByDoctorId(id)
    if (patients.length === 0) {
        await findAndDeleteUserById(id)
        delete_all_tests_from_doctor(id)
    } else {
        throw new Error('Doctor has patients')
    }
}

function unassign_patient_from_all_test(patientid) {
    return new Promise((resolve, reject) => {
        Test.updateMany({ "patients.patientid": patientid }, { $pull: { "patients": { "patientid": patientid } } }, { new: true })
        .then((test) => {
            resolve(test)
        }).catch((err) => {
            reject(err)
        })
    })
}

function delete_all_tests_from_doctor(doctorid) {
    Test.deleteMany({ doctorid: doctorid })
        .then((test) => {
            return;
        }).catch((err) => {
            return;
        })
}

exports.get_edit_user = (req, res) => {
    //Function to render edit user page
    res.render("editUser", { user: req.user, i18n: global.i18n })
}

exports.edit_user = async (req, res) => {
    //Function to update user with id=req.params.id and data=req.body
    try {
        await findAndUpdateUserById(req.params.id, req.body)
        req.flash("success", global.i18n.Userupdated)
        res.redirect("/view/" + req.user._id)
    } catch (err) {
        req.flash("error", global.i18n.Usernotupdated)
        res.status(500)
        res.send(err)
        console.log(err)
    }
}

exports.checkusername = (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

exports.get_details_for_graph = (req, res) => {
    //fetch all user with role patients or doctors
    User.find({ role: { $in: ['patient', 'doctor'] } }, { email: 0, age: 0, username: 0, displaypic: 0 })
        .then((users) => {
            res.send({ users: users })
        })
        .catch((err) => {
            res.status(500)
            res.send(err)
            console.log(err)
        })
}

exports.count_no_of_tests = (req, res) => {
    Test.countDocuments().then((test) => {
        res.send({ test: test })
    }).catch((err) => {
        res.status(500)
        res.send(err)
        console.log(err)
    })
}

exports.count_no_of_questions = (req, res) => {
    Question.countDocuments().then((question) => {
        res.send({ question: question })
    }).catch((err) => {
        res.status(500)
        res.send(err)
        console.log(err)
    })
}

exports.active_patient = (req, res) => {
    /* Set the status of the patient to active */
    User.findOneAndUpdate({ _id: req.params.patientid, role: 'patient' }, { $set: { status: 'active' } }, { new: true })
        .then((patient) => {
            req.flash('success', global.i18n.Patientactivatedsuccessfully)
            res.status(200)
            res.redirect('/view/patient/')
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
}

exports.change_doctor = async (req, res) => {
    /* Change the doctor of the patient 
        1. Find all the tests with patient id===req.params.patientid
        2. Check whether all patients.status==='pending' then update test.status='pending'
        3. Unassign_patient_form_all_tests
        4. change doctor
    */
   await find_And_Update_Test_Status(req.params.patientid)
   await unassign_patient_from_all_test(req.params.patientid)
   User.findByIdAndUpdate(req.params.patientid,{doctorid: req.body.doctorId},{ new: true })
   .then((patient) => {
        req.flash('success', global.i18n.Doctorchangedsuccessfully)
        res.status(200)
        res.redirect('/view/patient/')
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}

function find_And_Update_Test_Status(patientId){
    return new Promise((resolve, reject) => {
        Test.find({'patients.$.patientid':patientId}, {_id:1,patients:1},(err, tests)=>{
            if (err) {
                reject(err);
            }
            else{
                let status='pending'
                let count=0
                tests.forEach((test)=>{
                    if(test.patients.length===1){
                        count=1
                    }
                    test.patients.forEach((patient) => {
                        if (patient.patientid.toString() !== patientId && patient.status !== 'pending') {
                            status = patient.status
                        }
                    })
                    if(status === 'pending' || count===1){
                        Test.findOneAndUpdate({ _id: test._id }, { $set: { status: 'pending' } }, { new: true })
                        .then((test) => {
                            
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                })
                resolve(tests)
            }
        })
    })
}