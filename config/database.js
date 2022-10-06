const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_ATLAS_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                keepAliveInitialDelay: 300000
            }
        )
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;