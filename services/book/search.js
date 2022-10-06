const googleBooksApi = require('../../util/googleBooksApi')

exports.search = async (req, res) => {
    const {query} = req.query
    try {
        const response = await googleBooksApi.get('',{ params: { q: query } })
        if(response.data.totalItems === 0 || !response.data.items)
            return res.status(404).json({
                message: `No results found for ${query}`
            })
        
        let books = response.data.items.map(item => {
            item.volumeInfo.googleApiId = item.id
            return item.volumeInfo
        })

        res.status(201).json(books)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error'
        });
    }
}