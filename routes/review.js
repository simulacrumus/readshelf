const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization')
const verification = require('../middleware/verification')
const { addOrUpdateReview } = require('../controller/review/addOrUpdateReview');
const { deleteReview } = require('../controller/review/deleteReview');

// @route   POST api/v1/review
// @desc    Add or update a review
// @access  Private
router.route('/').post( authorization, verification, addOrUpdateReview)

// @route   DELETE api/v1/review/:id
// @desc    Delete a review by ID
// @access  Private
router.route('/:id').delete( authorization, deleteReview )

module.exports = router;