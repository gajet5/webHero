const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersZones = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters',
        require: true
    },
    current: {
        type: String,
        require: true
    },
    zones: [
        {
            id: {
                type: String,
                require: true
            },
            availability: {
                type: Boolean,
                require: true,
                default: false
            }
        }
    ]
});

module.exports = mongoose.model('CharactersZones', CharactersZones);
