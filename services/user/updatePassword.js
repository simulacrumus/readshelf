const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body
    const {id} = req.user
    try {

        let user = await User.findById(id)

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if(user.email !== email)
            return res
                .status(401)
                .json({
                    errors: [{
                        param: 'updatePassword',
                        message: 'Invalid Credentials'
                    }]
                });

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch)
            return res
                .status(401)
                .json({
                    errors: [{
                        param: 'updatePassword',
                        message: 'Invalid Credentials'
                    }]
                });
        
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);

        user = await User.findOneAndUpdate({
            id
        },{
            password
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