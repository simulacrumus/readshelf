const { body, validationResult } = require('express-validator')
const { updateNewsletterSubscription} = require('../../services/profile/updateNewsletterSubscription')

exports.updateNewsletterSubscription = [
    body('isSubscribed')
        .not()
        .isEmpty()
        .withMessage('Subscription option cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
                message: ''
            })
        }
        updateNewsletterSubscription(req, res)
    }
]