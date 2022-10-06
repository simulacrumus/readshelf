const Profile = require('../../models/profile.model')

exports.getProfile = async (req, res) => {
    const {id} = req.user
    try {
        const profile = await Profile.findOne({user: id})
            .populate('user', ['firstName', 'lastName', 'email', 'registerDate'])
            .populate('wishlist')
            .populate('myBooks')
            .populate('recentlyViewedBooks')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'firstName lastName _id'
                },
                populate: {
                    path: 'book',
                    select: 'title googleApiId imageLinks'
                }
            })
        if (!profile) {
            return res.status(404).json({
                message: 'There is no profile found for this user'
            });
        }
        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}