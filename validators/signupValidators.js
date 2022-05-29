const { check, validationResult } = require('express-validator');
exports.registerValidator = [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('age').not().isEmpty().withMessage('Age is required'),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('role').not().isEmpty().withMessage('Role is required'),
    // check('displaypic').not().isEmpty().withMessage('Displaypic is required'),
    check('role').not().isIn(['admin']).withMessage('Role is invalid:Admin user can only be added by the development team'),
    check('role').if(check('role').equals('patient')).custom((value, { req }) => {
        if (req.user.role === 'admin') {
            check('strokeDate').not().isEmpty().withMessage('Stroke Date is required'),
            check('diagnosis').not().isEmpty().withMessage('Diagnosis is required')
            check('doctorid').not().isEmpty().withMessage('Please assign doctor to the patient')
            return true;
            
        }
        else {
            throw new Error('Only admin can add patient');
        }
    }),
    check('role').if(check('role').equals('doctor')).custom((value, { req }) => {
        if (req.user.role === 'admin') {
            check('strokeDate').isEmpty().withMessage('Stroke Date is required'),
            check('diagnosis').isEmpty().withMessage('Diagnosis is required')
            check('doctorid').isEmpty().withMessage('Please assign doctor to the patient')
            return true;            
        }
        else {
            throw new Error('Only admin can add doctor');
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }  
]
function isCommonFieldsPresent() {
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('age').not().isEmpty().withMessage('Age is required'),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('role').not().isEmpty().withMessage('Role is required')
    check('displaypic').not().isEmpty().withMessage('Displaypic is required')
}
function isAdmin(){
    check('role').isIn(['admin']).withMessage('Role is invalid:Admin user can only be added by the development team')
}
function isPatientFieldsPresent(){
    check('strokeDate').not().isEmpty().withMessage('Stroke Date is required'),
    check('diagnosis').not().isEmpty().withMessage('Diagnosis is required')
    check('doctorid').not().isEmpty().withMessage('Please assign doctor to the patient')
}
function isPatientFieldsNotPresent(){
    check('strokeDate').isEmpty().withMessage('Stroke Date is required'),
    check('diagnosis').isEmpty().withMessage('Diagnosis is required')
    check('doctorid').isEmpty().withMessage('Please assign doctor to the patient')
}   