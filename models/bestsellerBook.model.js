const mongoose = require('mongoose');

const BestsellerBookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String,
    },
    publisher: {
        type: String,
    },
    book_image: {
        type: String
    },
    primary_isbn10: {
        type: String
    },
    primary_isbn13: {
        type: String
    },
    googleApiId:{
        type: String
    },
    updated: {
        type: Date,
        default: Date.now
    },
});
var BestSellerBook = mongoose.model('bestseller-book', BestsellerBookSchema);
module.exports = BestSellerBook;