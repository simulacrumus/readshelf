const { body, validationResult} = require('express-validator')
const { register } = require('../../services/authentication/register')

exports.register =[
    body('firstName')
        .trim()

        .not()
        .isEmpty()
        .withMessage('First name required')
        
        .isLength({min: 1})
        .withMessage('First name required')
    
        .matches(/^[A-Z]+$/i)
        .withMessage('Only alphabetic characters'),

    body('lastName')
        .trim()

        .not()
        .isEmpty()
        .withMessage('Last name required')
        
        .isLength({min: 1})
        .withMessage('Last name required')
    
        .matches(/^[A-Z]+$/i)
        .withMessage('Only alphabetic characters'),
    body('email')
        .trim()

        .not()
        .isEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password required')

        .isLength({ min: 8})
        .withMessage('Password should be at least 8 characters long')

        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .withMessage('Password should contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'),

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Signup failed'
            })
        }
        await register(req, res)
    }
]