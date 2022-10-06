const googleBooksApi = require('../util/googleBooksApi')

exports.findBookGoogleApiIdByTitleAndAuthor = async ({ title, author }) => {
    const response = await googleBooksApi.get('',{ params: { q: title, inauthor: author } })
    if(response.data && response.data.items){
        const googleApiId = response.data.items[0].id
        return googleApiId;
    }
}