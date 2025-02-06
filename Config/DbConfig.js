require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = process.env
mongoose.set('debug', true);
exports.connect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Successfully connected to database')
        })
        .catch((error) => {
            console.log(error)
            console.log('database connection failed. exiting now...')
            console.error(error.message)
            process.exit(1)
        })
}