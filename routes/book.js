const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization')
const verification = require('../middleware/verification')
const { getBook } = require('../controller/book/getBook');
const { search } = require('../controller/book/search');
const { getBestsellerBooks } = require('../controller/book/getBestsellerBooks');
const { getBookByTitleAndAuthor } = require('../controller/book/getBookByTitleAndAuthor');

// @route   GET api/v1/book/search?query=searchkey
// @desc    Search a book
// @access  Private
router.route('/search').get( authorization, verification, search )

// @route   GET api/v1/book/best-sellers
// @desc    Get the New York Times Bestseller Books List for the current date
// @access  Private
router.route('/best-sellers').get( authorization, verification, getBestsellerBooks )

// @route   GET api/v1/book
// @desc    Get a book with title and author name
// @access  Private
router.route('/test').get( authorization, verification, getBookByTitleAndAuthor )

// @route   GET api/v1/book/:id
// @desc    Get a book by Google Books API id
// @access  Private
router.route('/:id').get( authorization, verification, getBook )

module.exports = router;