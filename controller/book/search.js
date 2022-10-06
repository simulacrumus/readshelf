const { query, validationResult } = require('express-validator')
const { search } = require('../../services/book/search')

exports.search = [
    query('query')
        .trim()
        .not()
        .isEmpty()
        .withMessage('No search query found'),
    async (req, res) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Book search failed'
            })
        }
        search(req, res)
    }
]