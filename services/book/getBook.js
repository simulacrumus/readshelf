const Book = require('../../models/book.model')
const googleBooksApi = require('../../util/googleBooksApi')

exports.getBook = async (req, res) => {
    const googleApiId = req.params.id.trim()
    try {
        let book = await Book.findOne({
            googleApiId
        })
        .populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'firstName lastName _id username'
            }
        })

        if(book){
            return res.status(201).json(book)
        }

        const response = await googleBooksApi.get(`/${googleApiId}`)
        
        if(!response.data.volumeInfo)
            return res.status(404).json({
                message: 'Book not found'
            })

        book = {...response.data.volumeInfo, googleApiId}
        res.status(201).json(book)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}