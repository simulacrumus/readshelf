const User = require('../../models/user.model')
const Profile = require('../../models/profile.model')
const Review = require('../../models/review.model')
const Book = require('../../models/book.model')

exports.deleteUser = async (req, res) => {
    const {id} = req.user
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: 'There is no user'
            });
        }

        // Delete User Reviews
        await Review.deleteMany({user: id})
        // Delete User Profile
        await Profile.findOneAndDelete({user: id});
        // Delete User
        await User.findByIdAndDelete(id)

        res.status(204).json('User Deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error!',
        });
    }
}