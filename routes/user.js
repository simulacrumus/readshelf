const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization')
const verification = require('../middleware/verification')
const { deleteUser } = require('../controller/user/deleteUser');
const { getUser } = require('../controller/user/getUser');
const { updatePassword } = require('../controller/user/updatePassowrd');
const { updateUserInfo } = require('../controller/user/updateUserInfo');

// @route   GET api/v1/user
// @desc    Get Logged In User
// @access  Private
router.route('/').get( authorization, getUser )

// @route   PUT api/v1/user/
// @desc    Update Logged In User Info
// @access  Private
router.route('/').put( authorization, verification, updateUserInfo )

// @route   DELETE api/v1/user/
// @desc    Delete Logged In User and All User Related Data
// @access  Private
router.route('/').delete( authorization, verification, deleteUser )

// @route   PATCH api/v1/user/password
// @desc    Update Password for Logged In User
// @access  Private
router.route('/password').post( authorization, verification, updatePassword )

module.exports = router;