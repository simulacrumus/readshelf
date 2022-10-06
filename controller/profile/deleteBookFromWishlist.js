const { param, validationResult } = require('express-validator')
const { deleteBookFromWishlist } = require('../../services/profile/deleteBookFromWishlist')

exports.deleteBookFromWishlist = [
    param('id')
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
        deleteBookFromWishlist(req, res) 
    } 
]