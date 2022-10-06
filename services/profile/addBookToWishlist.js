const Profile = require('../../models/profile.model')
const Book = require('../../models/book.model')
const googleBooksApi = require('../../util/googleBooksApi')

exports.addBookToWishlist = async (req, res) => {
    const { googleApiId } = req.body
    const {id} = req.user
    try {
        let profile = await Profile.findOne({
            user: id
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

        if (!profile) {
            return res.status(404).json({
                message: 'There is no profile found for this user'
            });
        }

        if (!profile.wishlist.some(book => book.googleApiId === googleApiId)){
            const response = await googleBooksApi.get(`/${googleApiId}`)
            if(!response.data){
                return res.status(404).json({
                    message: `There is no book found with ID ${googleApiId}`
                });
            }
            const bookToAdd = response.data.volumeInfo
            const addedBook = await Book.findOneAndUpdate({
                googleApiId
            }, {
                ...bookToAdd,
                googleApiId
            }, {
                upsert: true,
                new: true
            })
            profile = await Profile.findOneAndUpdate(
                {
                    user: id
                },
                {
                    $addToSet: {wishlist: addedBook._id}
                },{
                    upsert: true,
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
        }
        res.status(200).json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        })
    }
}