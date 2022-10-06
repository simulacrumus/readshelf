const User = require('../models/user.model')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({
            id: req.user.id
        }).select('emailVerified')
        if(!user){
            return res.status(401).json({
                message: 'User does not exist!',
            });
        }
        if(!user.emailVerified){
            return res.status(401).json({
                message: 'Please verify your email',
                emailVerified: false
            });
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error!',
        });
    }
}