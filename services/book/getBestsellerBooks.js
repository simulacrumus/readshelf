const BestsellerBook = require('../../models/bestsellerBook.model')

exports.getBestsellerBooks = async (req, res) => {
    try {
        const books = await BestsellerBook.find({})
        res.status(200).json(books)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}