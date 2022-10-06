const Profile = require('../../models/profile.model')

exports.updateNewsletterSubscription = async (req, res) => {
    const {isSubscribed} = req.body
    const {id} = req.user
    try {
        await Profile.findOneAndUpdate({
            user: id
        },{
            newsletter: isSubscribed
        },{
            upsert: true
        })
        res.status(204).end()
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        })
    }
}