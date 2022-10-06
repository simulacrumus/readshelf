const Review = require('../../models/review.model')
const Book = require('../../models/book.model')
const Profile = require('../../models/profile.model')

exports.deleteReview = async (req, res) => {
    const {id} = req.user
    const reviewId = req.params.id
    try {
        const review = await Review.findOne({
            _id: reviewId
        })
        .populate('user', ['_id'])

        if(!review){
            return res.status(404).json({
                message: `There is no review found with ID ${reviewId}`
            });
        }

        if(review.user.id !== id){
            return res.status(403).json({
                message: `User does not have permissions to remove review with ID ${reviewId}`
            });
        }

        await Review.findOneAndDelete({
            _id: reviewId
        })

        await Profile.findOneAndUpdate({
            _id: id
        },{
            $pull: {
                reviews: reviewId
            }
        })

        await Book.findOneAndUpdate({
            googleApiId: review.googleApiId
        },{
            $pull: {
                reviews: reviewId
            }
        })

        res.status(204).end()
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}