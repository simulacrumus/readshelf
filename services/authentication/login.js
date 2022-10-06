const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res
                .status(401)
                .json({
                    errors: [{
                        param: 'login',
                        msg: 'Invalid Credentials'
                    }]
                });
        }

        if(user.registerType === 'googleOAuth'){
            return res.status(401).json({
                errors: [{
                    param: 'login',
                    msg: 'Please sign in with Google'
                }]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(401)
                .json({
                    errors: [{
                        param: 'login',
                        msg: 'Invalid Credentials'
                    }]
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
            expiresIn: '100d'
        },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    token: token,
                    message: 'Login success'
                })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: 'Server error'});
    }
}