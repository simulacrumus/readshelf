const axios = require('axios')

const googleBooksApi = axios.create({
    baseURL: process.env.GOOGLE_BOOKS_API_ADDRESS,
    params: {
      key: process.env.GOOGLE_BOOKS_API_KEY,
      maxResults: 40
    }
});

module.exports = googleBooksApi