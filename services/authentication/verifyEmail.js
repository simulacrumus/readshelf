const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')

exports.verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOneAndUpdate({
            verificationCode
        },
        {
            emailVerified: true,
            verificationCode:''
        })

        if(!user){
            return res.status(401).json({ 
                message: 'Invalid verification code'
            });
        }

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
                if (err) throw err;
                res.status(201).json({
                    token,
                    message: 'Verification Success!'
                })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error!',
        });
    }
}