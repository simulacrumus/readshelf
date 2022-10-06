const { body, validationResult } = require('express-validator')
const { updateUserInfo} = require('../../services/user/updateUserInfo')

exports.updateUserInfo =[
    body('firstName')
        .not()
        .isEmpty()
        .withMessage('First name required')
        .isLength({min: 2})
        .withMessage('First Name must be at least 2 chars long'),
    body('lastName')
        .not()
        .isEmpty()
        .withMessage('Last name required')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 chars long'),
        async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    errors: errors.array(),
                    message: 'User update failed'
                })
            }
            await updateUserInfo(req, res)
        }
]