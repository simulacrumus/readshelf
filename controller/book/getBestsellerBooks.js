const { getBestsellerBooks } = require('../../services/book/getBestsellerBooks')

exports.getBestsellerBooks = [
    async (req, res) => { await getBestsellerBooks(req, res)}
]