const { param, validationResult } = require('express-validator')
const { getPublicProfile} = require('../../services/profile/getPublicProfile')

exports.getPublicProfile = [
    param('username')
        .not()
        .isEmpty()
        .withMessage('Username cannot be empty'),
    async (req, res) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: ''
            })
        }
        getPublicProfile(req, res) 
    } 
]