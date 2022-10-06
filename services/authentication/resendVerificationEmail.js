const User = require('../../models/user.model')
const {sendEmail} = require('../../util/sendGridSendEmail')

exports.resendVerificationEmail = async (req, res) => {
    try {
        const {id} = req.user
        
        const user = await User.findById(id)
        
        if(!user)
            return res.status(201).json({
                message: `We've sent you a verification email`
            })
        
        if(user.emailVerified)
            return res.status(201).json({
                message: `Your email has already been verified`
            })
        
        if(user.registerType === 'googleOAuth')
            return res.status(401).json({
                errors: [{
                    param: 'resetPassword',
                    msg: 'Please sign in with Google'
                }]
            })
    
        const html = `
            <h3>Hi, ${user.firstName}!</h3>
            <p>Click <a href="${process.env.APP_BASE_URI}/verify-email?code=${user.verificationCode}" target="_blank" >here</a> to confirm your email!</p>
        `

        await sendEmail({
            to: user.email,
            subject: `Please Verify Your Email`,
            text:`Test`,
            html
        })
        
        res.status(201).json({
            message: `We've sent you a verification email`
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}