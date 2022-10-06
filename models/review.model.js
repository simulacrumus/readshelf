const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    googleApiId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true, 
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
})
var Review = mongoose.model('review', ReviewSchema);
module.exports = Review;