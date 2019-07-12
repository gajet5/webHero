const mongoose = require('mongoose');
const path = require('path');

const config = require(path.join(__basedir, 'config'));

mongoose.connect(config.db.URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
    process.exit(1);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    connection: mongoose.connection
};