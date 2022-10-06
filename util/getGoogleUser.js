const axios = require('axios')
const oAuthClient = require('./OAuthClient')

const getAccessAndBearerTokenURL = ({ accessToken }) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

exports.getGoogleUser = async ({code}) => {
    const { tokens } = await oAuthClient.getToken({code});
    const response = await axios.get(
        getAccessAndBearerTokenURL({ accessToken: tokens.access_token }),
        { headers: { Authorization: `Bearer ${tokens.id_token}`} },
    );
    return response.data;
}