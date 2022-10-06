const generateGoogleOAuthURL = require("../../util/googleOAuthURL");

exports.getGoogleOAuthURL = async (req, res) => {
    try {
        const url = generateGoogleOAuthURL();
        res.status(200).json({ url });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error!',
        });
    }
}