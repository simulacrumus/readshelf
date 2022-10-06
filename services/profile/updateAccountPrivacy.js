const Profile = require('../../models/profile.model')

exports.updateAccountPrivacy = async (req, res) => {
    const {isPrivateAccount} = req.body
    const {id} = req.user
    try {
        await Profile.findOneAndUpdate({
            user: id
        },{
            privateAccount: isPrivateAccount
        })
        res.status(204).end()
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        })
    }
}