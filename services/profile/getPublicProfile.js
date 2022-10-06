const Profile = require('../../models/profile.model')
const User = require('../../models/user.model')

exports.getPublicProfile = async (req, res) => {
    const username = req.params.username
    try {
        const user = await User.findOne({
            username
        })
        .select(['id','firstName', 'lastName', 'registerDate', 'username','registerType']);

        if(!user){
            return res.status(404).json({
                message: `There is no user with username ${username}`
            });
        }

        const profile = await Profile.findOne({
            user: user._id
        })
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

        if(!profile){
            return res.status(404).json({
                message: `There is no profile with username ${username}`
            });
        }

        res.status(200).json({user, profile})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        })
    }
}