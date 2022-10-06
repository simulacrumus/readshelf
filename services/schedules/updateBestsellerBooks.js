const BestsellerBook = require('../../models/bestsellerBook.model')
const nytimesBestsellersApi = require('../../util/nytimesBestsellersApi')
const { getCurrentDate } = require('../../util/getCurrentDate')
const { findBookGoogleApiIdByTitleAndAuthor } = require('../../util/findBookGoogleApiId')

const shuffleArray = (array) => {
    let currentIndex = array.length,randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

const truncateBestsellerBooks = async () => {
    try {
        await BestsellerBook.deleteMany({})
    } catch (err) {
        console.error(err.message);
    }
}

const getBestsellerBooks = async (date, listName) => {
    try {
        const res = await nytimesBestsellersApi.get(`/${date}/${listName}.json`)
        if(res.data){
            return res.data.results.books
        }
    } catch (err) {
        console.error(err.message);
    }   
}

exports.updateBestsellerBooks = async () => {
    const fiction = 'Combined Print and E-Book Fiction'
    const nonFiction = 'Combined Print and E-Book Nonfiction'
    const currentDate = getCurrentDate()
    try {
        const fictionBestsellers = await getBestsellerBooks(currentDate,fiction);
        const nonFictionBestsellers = await getBestsellerBooks(currentDate, nonFiction);
        if(fictionBestsellers && nonFictionBestsellers){
            await truncateBestsellerBooks();
            let allBestsellers = shuffleArray(fictionBestsellers.concat(nonFictionBestsellers))
            allBestsellers = await Promise.all(allBestsellers.map(async (book) => {
                const googleApiId = await findBookGoogleApiIdByTitleAndAuthor({title: book.title, author: book.author});
                return {...book, googleApiId};
            }));
            await BestsellerBook.insertMany(allBestsellers)
        }
    } catch (err) {
        console.error(err.message);
    }
}
