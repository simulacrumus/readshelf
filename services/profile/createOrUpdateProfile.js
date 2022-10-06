const Profile = require('../../models/profile.model')

exports.createOrUpdateProfile = async (req, res) => {
    const {id} = req.user
    const {bio, dateOfBirth} = req.body
    const {country, state, city } = req.body.location
    const {website, twitter, facebook, youtube, instagram } = req.body.links

    const profileFields = {
        user: id,
        bio,
        dateOfBirth,
        location: {
            country, state, city
        },
        links: {
            website, twitter, facebook, youtube, instagram
        }
    }
    try {
        const profile = await Profile.findOneAndUpdate({
            user: id
        }, {
            $set: profileFields
        }, {
            new: true,
            upsert: true
        })
            .select('-avatar')
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

        res.status(201).json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}