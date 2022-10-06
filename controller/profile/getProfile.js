const { getProfile} = require('../../services/profile/getProfile')

exports.getProfile = async (req, res) => { getProfile(req, res) }