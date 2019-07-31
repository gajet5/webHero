const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersItems = new Schema({
    ownerID: {
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
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('CharactersItems', CharactersItems);
