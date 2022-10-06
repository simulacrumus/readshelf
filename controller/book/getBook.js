const { param, validationResult } = require('express-validator')
const { getBook } = require('../../services/book/getBook')

exports.getBook = [
    param('id')
        .trim()
        .not()
        .isEmpty()
        .withMessage('No book ID provided'),
    async (req, res) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Book fetch failed'
            })
        }
        await getBook(req, res)
    }
]