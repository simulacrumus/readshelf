const mongoose = require('mongoose');
const Review = require('../../models/review.model')
const Book = require('../../models/book.model')
const Profile = require('../../models/profile.model')
const googleBooksApi = require('../../util/googleBooksApi')

exports.addOrUpdateReview = async(req, res) => {
    const {id} = req.user
    const {googleApiId, text, rating} = req.body
    try {
        const response = await googleBooksApi.get(`/${googleApiId}`)

        if(!response.data){
            return res.status(404).json({
                message: `There is no book found with ID ${googleApiId}`
            });
        }

        const book = await Book.findOneAndUpdate({
            googleApiId
        }, {
            ...response.data.volumeInfo,
            googleApiId,
        }, {
            upsert: true,
            new: true
        })

        const profile = await Profile.findOne({
            user: id
        })
        .populate('reviews')

        let reviewId = mongoose.Types.ObjectId();

        if(profile.reviews && profile.reviews.some(review => review.googleApiId === googleApiId)){
            reviewId = profile.reviews.find(review => review.googleApiId === googleApiId)._id
        }

        const review = await Review.findOneAndUpdate({
            _id: reviewId
        },
        {
            text,
            rating,
            googleApiId,
            user: id,
            book: book._id,
            date: Date.now()
        },{
            upsert: true,
            new: true
        })
        .populate('user', ['firstName', 'lastName', '_id'])
        .populate('book', ['title', 'googleApiId', 'imageLinks'])

        await Book.findOneAndUpdate({
            googleApiId
        }, {
            $addToSet: {
                reviews: review._id
            }
        })

        await Profile.findOneAndUpdate({
            user: id
        },{
            $addToSet: {
                reviews: review._id
            }
        })

        res.status(200).json(review)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}