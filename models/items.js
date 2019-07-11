const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Items = new Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters'
    },
    type: {
        type: String
    },
    weaponType: {
        type: String
    },
    count: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Items', Items);
