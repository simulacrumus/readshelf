const { deleteAvatar } = require('../../services/profile/deleteAvatar')

exports.deleteAvatar = async (req, res) => { deleteAvatar(req, res) }