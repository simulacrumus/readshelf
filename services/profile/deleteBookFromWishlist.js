const Profile = require('../../models/profile.model')
const Book = require('../../models/book.model')

exports.deleteBookFromWishlist = async (req, res) => {
    const { id: googleApiId } = req.params
    const {id} = req.user
    try {
        const book = await Book.findOne({
            googleApiId
        })

        const profile = await Profile.findOneAndUpdate(
            {
                user: id
            },
            {
                $pull: {wishlist: book._id}
            },{
                new: true
            }
        )
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
        })
    }
}