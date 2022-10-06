const { body, validationResult} = require('express-validator')
const { requestResetPassword } = require('../../services/authentication/requestResetPassword')

exports.requestResetPassword = [
    body('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Password reset failed'
            })
        }
        await requestResetPassword(req, res)
    }
]