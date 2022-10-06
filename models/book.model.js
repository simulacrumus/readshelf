const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    googleApiId: {
        type: String
    },
    title: {
        type: String,
        required: true,
        max: 250
    },
    industryIdentifiers: [
        {
            type: {
                type: String
            },
            identifier: {
                type: String
            }
        }
    ],
    authors: [{
        type: String,
        required: true
      }],
    description: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    },
    ratingsCount: {
        type: Number,
        required: true
    },
    averageRating:{
        type: Number,
        required: true
    },
    imageLinks: {
        thumbnail: {
            type: String
        },
        smallThumbnail: {
            type: String
        }
    },
    language: {
        type: String
    },
    publisher: {
        type: String
    },
    categories: [{
        type: String
    }],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ], default: []
});
var Book = mongoose.model('book', BookSchema);
module.exports = Book;
//module.exports = Book = mongoose.model('book', BookSchema);