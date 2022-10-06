require('dotenv').config()
const app = require('./app');
const http = require('http')
const server = http.createServer(app);
const connectDB = require('./config/database');
const {updateBestsellerBooks} = require('./services/schedules/updateBestsellerBooks')
const cron = require('node-cron');

try {
    connectDB().then(() => {
        console.log("Connected to Database")
    })
} catch (err) {
    console.log('Database connection failed')
}

// Retrieve NYTimes Bestseller Books List
(async ()=> await updateBestsellerBooks())()
.then(console.log('Popular Books Updated'))

// run schedule every day at 4:15 am to retrieve NYTimes Bestseller Books List
cron.schedule('15 4 * * * ', async () => {
    await updateBestsellerBooks();
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on PORT ${port}`));

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});