const { body, validationResult } = require('express-validator')
const { addBookToRecentlyViewedBooks } = require('../../services/profile/addBookToRecentlyViewedBooks')

exports.addBookToRecentlyViewedBooks = [
    body('googleApiId')
        .not()
        .isEmpty()
        .withMessage('Book ID cannot be empty'),
    async (req, res) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Book fetch failed'
            })
        }
        addBookToRecentlyViewedBooks(req, res) 
    } 
]