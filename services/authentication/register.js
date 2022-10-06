const User = require('../../models/user.model')
const Profile = require('../../models/profile.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {sendEmail} = require('../../util/sendGridSendEmail')
const { v4 } = require('uuid');

exports.register = async (req, res) => {

    const {firstName, lastName, password, email} = req.body

    try {
        const user = await User.findOne({email})

        if(user)
            return res.status(409).json({errors:[{
                param: 'email',
                msg: `Email already registered`
            }]})

        const verificationCode = v4();

        let newUser = new User({firstName, lastName, password, email, verificationCode, registerType: 'email'})

        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)
        
        newUser = await newUser.save()

        const profile = new Profile({ user: newUser.id})
        await profile.save()

        const payload = {
            user: {
                id: newUser.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, async (err, token) => {
            if (err) throw err;

            const htmloutput = `
                    <h3>Hi, ${newUser.firstName}! Welcome to Read Shelf</h3>
                    <p>Click <a href="${process.env.APP_BASE_URI}/verify-email?code=${verificationCode}" target="_blank" >here</a> to confirm your email!</p>
                `

            await sendEmail({
                to: newUser.email,
                subject: `Welcome to Read Shelf - Please Verify Your Email`,
                text:`.`,
                html: htmloutput
            })

            res.status(201).json({
                token,
                user: newUser,
                message: `User succesfullfy created. Confirmation email sent, please check your email address`
            })
        })
    } catch (err) {
        console.error(err.message);
            res.status(500).json({
                message: 'Server error'
            });
    }
}