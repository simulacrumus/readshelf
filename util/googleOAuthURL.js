const oAuthClient  = require("./OAuthClient");

const generateGoogleOAuthURL = () => {
    const scopes = [
        process.env.GOOGLE_OAUTH_SCOPE_EMAIL,
        process.env.GOOGLE_OAUTH_SCOPE_PROFILE
    ]

    return oAuthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
        include_granted_scopes: true
    })
}

module.exports = generateGoogleOAuthURL