const axios = require('axios')

const nytimesBestsellersApi = axios.create({
    baseURL: process.env.NYTIMES_API_ADDRESS,
    params: {
      "api-key": process.env.NYTIMES_API_KEY
    }
});

module.exports = nytimesBestsellersApi