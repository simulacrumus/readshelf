const jwt = require('jsonwebtoken')
const {getGoogleUser} = require("../../util/getGoogleUser");
const {createOrUpdateUserFromOAuth} = require("./createOrUpdateUserFromGoogleOAuth");

exports.getTokenWithGoogleOAuth = async (req, res) => {
    const { code } = req.query;
    try {
        const oauthUserInfo = await getGoogleUser({code} )
        const user = await createOrUpdateUserFromOAuth({ oauthUserInfo });

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err)
                    res.status(500).json({
                        message: 'Server Error!',
                    });
                res.status(301).redirect(`${process.env.APP_BASE_URI}/login?token=${token}`)
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error!',
        });
    }
    
}