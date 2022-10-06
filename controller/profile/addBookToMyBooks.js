const { body, validationResult } = require('express-validator')
const { addBookToMyBooks } = require('../../services/profile/addBookToMyBooks')

exports.addBookToMyBooks = [
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
        addBookToMyBooks(req, res) 
    } 
]