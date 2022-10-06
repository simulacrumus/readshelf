const { body, validationResult} = require('express-validator')
const {login} = require('../../services/authentication/login')

exports.login = [
    body('email')
        .trim()
        
        .not()
        .isEmpty()
        .withMessage('Email required')
        
        .isEmail()
        .withMessage('Invalid email'),
    
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password required'),
    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                message: 'Login failed'
            })
        }
        await login(req, res)
    }
]