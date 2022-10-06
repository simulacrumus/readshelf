const User = require('../../models/user.model')
const bcrypt = require('bcrypt');

exports.resetPassword = async (req, res) => {
    try {
        const { passwordResetCode, newPassword } = req.body

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newPassword, salt)

        
        const user = await User.findOneAndUpdate({
            passwordResetCode
        },{
            password,
            passwordResetCode:''
        })
        
        if(!user)
            return res.status(401).json({
                message: `Invalid reset password code`
            })
        
        res.status(204).json({
            message: 'Pasword updated'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}