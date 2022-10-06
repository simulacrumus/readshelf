const { body, validationResult } = require('express-validator')
const { updateAccountPrivacy} = require('../../services/profile/updateAccountPrivacy')

exports.updateAccountPrivacy = [
    body('isPrivateAccount')
        .not()
        .isEmpty()
        .withMessage('Account privacy option cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
                message: ''
            })
        }
        updateAccountPrivacy(req, res)
    }
]