const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersZones = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters',
        require: true
    },
    mapRegion: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('CharactersZones', CharactersZones);
