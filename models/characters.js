const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Characters = new Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts',
        require: true
    },
    level: {
        type: Number,
        default: 1
    },
    maxHp: {
        type: Number,
        default: 1
    },
    curHp: {
        type: Number,
        default: 1
    },
    maxMp: {
        type: Number,
        default: 1
    },
    curMp: {
        type: Number,
        default: 1
    },
    mapRegion: {
        type: String,
        default: 'adrin'
    },
    zone: {
        type: String,
        default: 'town'
    },
    exp: {
        type: Number,
        default: 0
    },
    stats: {
        // Влияет на Маг.атаку
        int: {
            type: Number,
            default: 1
        },
        // Влияет на Физ.Атаку
        str: {
            type: Number,
            default: 1
        },
        // Влияет на Hp
        con: {
            type: Number,
            default: 1
        },
        // Влияет на MP
        men: {
            type: Number,
            default: 1
        },
        // Влияет на Уворот, Меткость
        dex: {
            type: Number,
            default: 1
        },
        // Влияет на удачу (резисты, крит и пр)
        luck: {
            type: Number,
            default: 1
        }
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Characters', Characters);
