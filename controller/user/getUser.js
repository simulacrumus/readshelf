const { getUser} = require('../../services/user/getUser')

exports.getUser = async (req, res) => { await getUser(req, res)}