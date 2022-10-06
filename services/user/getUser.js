const User = require('../../models/user.model')

exports.getUser = async (req, res) => {
    const {id} = req.user
    try {
        const user = await User.findById(id)
            .select(['id','firstName', 'lastName', 'email', 'emailVerified', 'registerDate', 'username', 'registerType']);
        if (!user) {
            return res.status(404).json({
                message: 'There is no user'
            });
        }
        res.status(200).json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error!',
        });
    }
}