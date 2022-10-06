const { body, validationResult} = require('express-validator')
const { resetPassword } = require('../../services/authentication/resetPassword')

exports.resetPassword = [
    body('passwordResetCode')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password reset code required'),

    body('newPassword')
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
                message: 'Password reset failed'
            })
        }
        await resetPassword(req, res)
    }
]