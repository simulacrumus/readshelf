const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization')
const verification = require('../middleware/verification')
const { getProfile } = require('../controller/profile/getProfile');
const { createOrUpdateProfile } = require('../controller/profile/createOrUpdateProfile');
const { updateAvatar } = require('../controller/profile/updateAvatar');
const { getPublicProfile } = require('../controller/profile/getPublicProfile');
const { updateNewsletterSubscription } = require('../controller/profile/updateNewsletterSubscription');
const { updateAccountPrivacy } = require('../controller/profile/updateAccountPrivacy');
const { addBookToWishlist } = require('../controller/profile/addBookToWishlist');
const { addBookToMyBooks } = require('../controller/profile/addBookToMyBooks');
const { addBookToRecentlyViewedBooks } = require('../controller/profile/addBookToRecentlyViewedBooks');
const { deleteBookFromMyBooks } = require('../controller/profile/deleteBookFromMyBooks');
const { deleteBookFromWishlist } = require('../controller/profile/deleteBookFromWishlist');
const { deleteAvatar } = require('../controller/profile/deleteAvatar')

// @route   GET api/v1/profile/me
// @desc    Getlogged in user profile
// @access  Private
router.route('/me').get( authorization, verification, getProfile )

// @route   POST api/v1/profile
// @desc    Create or update profile
// @access  Private
router.route('/').post( authorization, verification, createOrUpdateProfile)

// @route   GET api/v1/profile/:username
// @desc    Get a public profile by username
// @access  Private
router.route('/:username').get( authorization, verification, getPublicProfile)

// @route   PATCH api/v1/profile/avatar
// @desc    Upload or update profile avatar
// @access  Private
router.route('/avatar').patch( authorization, verification, updateAvatar)

// @route   DELETE api/v1/profile/avatar
// @desc    Delete profile avatar
// @access  Private
router.route('/avatar').delete( authorization, verification, deleteAvatar)

// @route   PATCH api/v1/profile/newsletter
// @desc    Update newsletter subscription option
// @access  Private
router.route('/newsletter').patch( authorization, verification, updateNewsletterSubscription )

// @route   PATCH api/v1/profile/privacy
// @desc    Update account privacy option
// @access  Private
router.route('/privacy').patch( authorization, verification, updateAccountPrivacy )

// @route   PATCH api/v1/profile/wishlist
// @desc    Add a book to wishlist for the logged in user
// @access  Private
router.route('/wishlist').patch(authorization, verification, addBookToWishlist )

// @route   PATCH api/v1/profile/mybooks
// @desc    Add a book to my books list for the logged in user
// @access  Private
router.route('/mybooks').patch( authorization, verification, addBookToMyBooks)

// @route   PATCH api/v1/profile/recentlyViewedBooks
// @desc    Add a book to my recently viewed books for the logged in user
// @access  Private
router.route('/recentlyViewedBooks').patch( authorization, verification, addBookToRecentlyViewedBooks)

// @route   DELETE api/v1/profile/mybooks
// @desc    Delete a book from my books list for the logged in user
// @access  Private
router.route('/mybooks/:id').delete( authorization, verification, deleteBookFromMyBooks )

// @route   DELETE api/v1/books/wishlist
// @desc    Delete a book from my books list for the logged in user
// @access  Private
router.route('/wishlist/:id').delete( authorization, verification, deleteBookFromWishlist )

module.exports = router;