const User = require('../../models/user.model')
const {sendEmail} = require('../../util/sendGridSendEmail')
const { v4 } = require('uuid');

exports.requestResetPassword = async (req, res) => {
    try {
        const {email} = req.body
        const passwordResetCode = v4();
        const user = await User.findOneAndUpdate(
            {
                email
            },{
                passwordResetCode
            },{
                new: true
            })
        
        if(!user)
            return res.status(201).json({
                message: `Thanks - if you have a Read Shelf account, we've sent you an email`
            })
    
        const html = `
            <h3>Hi, ${user.firstName}!</h3>
            <p>Click <a href="${process.env.APP_BASE_URI}/reset-password?code=${user.passwordResetCode}" target="_blank" >here</a> to reset your password!</p>
        `

        await sendEmail({
            to: user.email,
            subject: `Reset Password`,
            text:`.`,
            html
        })
        
        res.status(201).json({
            message: `Thanks - if you have a Read Shelf account, we've sent you an email`
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}