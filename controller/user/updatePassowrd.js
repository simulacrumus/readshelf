const { body, validationResult } = require('express-validator')
const { updatePassword } = require('../../services/user/updatePassword')

exports.updatePassword = [
    body('currentPassword')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .withMessage('Password should be at least 8 chars long, contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'),
    body('newPassword')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .withMessage('Password should be at least 8 chars long, contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'),
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Password upodate failed'
            })
        }
        await updatePassword(req, res)
    }
]