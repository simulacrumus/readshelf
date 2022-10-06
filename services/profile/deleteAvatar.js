const Profile = require('../../models/profile.model')

exports.deleteAvatar = async (req, res) => {
    const {id} = req.user

    try {
        const profile = await Profile.findOneAndUpdate({
            user: id
        },{
            avatar: {}
        })

        if (!profile) {
            return res.status(404).json({
                message: 'There is no profile found for this user'
            });
        }

        res.status(204).end()
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        })
    }
}