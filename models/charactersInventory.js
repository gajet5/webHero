const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersInventory = new Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters'
    },
    itemId: {
        type: Number
    },
    type: {
        type: String
    },
    count: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('CharactersInventory', CharactersInventory);
