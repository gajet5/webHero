const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersItems = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters',
        require: true
    },
    itemId: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    type: {
        type: String
    },
    count: {
        type: Number
    }
});

module.exports = mongoose.model('CharactersItems', CharactersItems);
