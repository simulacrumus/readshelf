const User = require('../../models/user.model')

exports.updateUserInfo = async(req, res) => {
    const id = req.user.user.id
    const {firstName, lastName} = req.body
    try {
        const user = await User.findOneAndUpdate({
            _id: id,
        },
        {
            firstName,
            lastName
        },{
            new: true
        })
        .select(['id','firstName', 'lastName', 'email', 'emailVerified', 'registerDate', 'username', 'registerType']);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message);
            res.status(500).json({
                message: 'Server error'
            });
    }
}