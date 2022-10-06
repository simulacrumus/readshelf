const { deleteUser} = require('../../services/user/deleteUser')

exports.deleteUser = async (req, res) => { await deleteUser(req, res)}