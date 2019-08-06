const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersItems = new Schema({
    owner: {
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
    },
    canSell: {
        type: Boolean,
        require: true
    },
    autoSell: {
        type: Boolean,
        default: false,
        require: true
    }
});

module.exports = mongoose.model('CharactersItems', CharactersItems);
