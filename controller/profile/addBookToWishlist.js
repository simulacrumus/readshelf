const { body, validationResult } = require('express-validator')
const { addBookToWishlist } = require('../../services/profile/addBookToWishlist')

exports.addBookToWishlist = [
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
        addBookToWishlist(req, res) 
    } 
]