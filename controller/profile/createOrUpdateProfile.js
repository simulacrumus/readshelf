const { createOrUpdateProfile} = require('../../services/profile/createOrUpdateProfile')

exports.createOrUpdateProfile = async (req, res) => { createOrUpdateProfile(req, res) }