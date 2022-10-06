const Book = require('../../models/book.model')
const googleBooksApi = require('../../util/googleBooksApi')

exports.getBookByTitleAndAuthor = async (req, res) => {
    const {title, author} = req.query
    try {
        const response = await googleBooksApi.get('',{ params: { q: title, inauthor: author } })
        if(response.data.totalItems === 0 || !response.data.items)
            return res.status(404).json({
                message: `No results found for ${title}, ${author}`
            })
        const googleApiId = response.data.items[0].id
        res.status(200).json({googleApiId})
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}