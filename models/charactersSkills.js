const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersSkills = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters',
        require: true
    },
    type: {
        type: String,
        require: true,
        default: 'FIST'
    },
    level: {
        type: Number,
        require: true,
        default: 1
    }
});

module.exports = mongoose.model('CharactersSkills', CharactersSkills);
