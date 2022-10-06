const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const verification = require('../middleware/verification');
const { login } = require('../controller/authentication/login');
const { register } = require('../controller/authentication/register');
const { requestResetPassword } = require('../controller/authentication/requestResetPassword');
const { resendVerificationEmail } = require('../controller/authentication/resendVerificationEmail');
const { verifyEmail } = require('../controller/authentication/verifyEmail');
const { resetPassword } = require('../controller/authentication/resetPassword');
const { getTokenWithGoogleOAuthURL } = require('../controller/authentication/getTokenWithGoogleOAuthURL');
const { getGoogleOAuthURL } = require('../controller/authentication/getGoogleOAuthURL');

// @route   POST api/v1/auth/login
// @desc    Sign in
// @access  Public
router.route('/login').post( login )

// @route   POST api/v1/auth/register
// @desc    Sign up
// @access  Public
router.route('/register').post( register )

// @route   POST api/v1/auth/request-reset-password
// @desc    Request Reset Password
// @access  Public
router.route('/request-reset-password').put( requestResetPassword )

// @route   POST api/v1/auth/reset-password
// @desc    Reset Password
// @access  Private
router.route('/reset-password').post( resetPassword )

// @route   POST api/v1/auth/verify-email
// @desc    Verify Email Address
// @access  Public
router.route('/verify-email').put( verifyEmail )

// @route   POST api/v1/auth/resend-verification-email
// @desc    Resend Verification Email
// @access  Public
router.route('/resend-verification-email').get( authorization, resendVerificationEmail )

// @route   GET api/v1/auth/google/url
// @desc    Get Google OAuth URL
// @access  Public
router.route('/google/url').get( getGoogleOAuthURL )

// @route   GET api/v1/auth/google/callback
// @desc    Get Toekn with Google OAuth URL
// @access  Public
router.route('/google/callback').get( getTokenWithGoogleOAuthURL )

module.exports = router;