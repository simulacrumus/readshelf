const { query, validationResult } = require('express-validator')
const { getBookByTitleAndAuthor } = require('../../services/book/getBookByTitleAndAuthor')

exports.getBookByTitleAndAuthor = [
    query('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage('No title provided'),
    query('author')
        .not()
        .isEmpty()
        .withMessage('No author name provided'),
    async (req, res) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Book fetch failed'
            })
        }
        await getBookByTitleAndAuthor(req, res)
    }
]