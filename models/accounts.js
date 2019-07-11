const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Accounts = new Schema({
    userId: {
        type: String,
        require: true,
        unique: true
    },
    chatId: {
        type: String,
        require: true
    },
    firsName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    scene: {
        type: String,
        default: 'start'
    },
    haveCharacter: {
        type: Boolean,
        default: false
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Accounts', Accounts);
