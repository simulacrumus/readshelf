const { param, validationResult } = require('express-validator')
const { deleteReview} = require('../../services/review/deleteReview')

exports.deleteReview = [
    param('id').trim()

        .not()
        .isEmpty()
        .withMessage('ID required')
    
        .isMongoId()
        .withMessage('Invalid ID'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Removing review unsuccessfull'
            })
        }
        await deleteReview(req, res)
    }
]