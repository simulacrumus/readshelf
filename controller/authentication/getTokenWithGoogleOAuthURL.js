const { query, validationResult} = require('express-validator')
const { getTokenWithGoogleOAuth } = require('../../services/authentication/getTokenWithGoogleOAuth')

exports.getTokenWithGoogleOAuthURL = [
    query('code')
        .not()
        .isEmpty()
        .withMessage('Code required'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
                message: 'Google Authentication Failed'
            })
        }
        await getTokenWithGoogleOAuth(req, res)
    }
]