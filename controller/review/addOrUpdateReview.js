const { body, validationResult } = require('express-validator')
const { addOrUpdateReview} = require('../../services/review/addOrUpdateReview')

exports.addOrUpdateReview =[
    body('text')
        .not()
        .isEmpty()
        .withMessage('Review required'),
    body('rating')
        .not()
        .isEmpty()
        .withMessage('Rating required')
        .isNumeric()
        .withMessage('Rating should be a number'),
    body('googleApiId')
        .not()
        .isEmpty()
        .withMessage('ID required'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Posting review failed'
            })
        }
        addOrUpdateReview(req, res)
    }
]