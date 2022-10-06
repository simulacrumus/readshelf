const User = require('../../models/user.model')
const Profile = require('../../models/profile.model')

exports.createOrUpdateUserFromOAuth = async ({ oauthUserInfo }) => {
    const {
        id: googleID,
        given_name: firstName,
        family_name: lastName,
        verified_email: emailVerified,
        email,
        picture: googleAvatar
    } = oauthUserInfo

    try {
        const user = await User.findOneAndUpdate({
                email
            },
            {
                firstName,
                lastName,
                email,
                googleAvatar,
                emailVerified,
                googleID,
                registerType: 'googleOAuth'
            },{
                new: true,
                upsert: true
            })

        await Profile.findOneAndUpdate({
            user: user.id
        },{

        },{
            upsert: true
        })

        return user;
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}
