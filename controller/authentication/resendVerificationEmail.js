const { resendVerificationEmail } = require("../../services/authentication/resendVerificationEmail")

exports.resendVerificationEmail = async (req, res) => { await resendVerificationEmail(req, res)}