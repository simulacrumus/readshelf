const { getGoogleOAuthURL } = require('../../services/authentication/getGoogleOAuthURL')

exports.getGoogleOAuthURL = async (req, res) => { await getGoogleOAuthURL(req, res)}