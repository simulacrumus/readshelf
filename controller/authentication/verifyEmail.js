const { body, validationResult} = require('express-validator')
const { verifyEmail } = require('../../services/authentication/verifyEmail')

exports.verifyEmail = [
    body('verificationCode')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Verification code required'),

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Verify email failed'
            })
        }
        await verifyEmail(req, res)
    }
]