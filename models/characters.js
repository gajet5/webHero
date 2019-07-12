const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Characters = new Schema({
    accountId: {
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
    zone: {
        type: String,
        default: 'start'
    },
    exp: {
        type: Number,
        default: 0
    },
    sp: {
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
        // Влияет на Сопротивлаемость к дебафам
        wit: {
            type: Number,
            default: 1
        },
        critRate: {
            type: Number,
            default: 1
        },
        pAtkSpd: {
            type: Number,
            default: 1
        },
        mAtkSpd: {
            type: Number,
            default: 1
        },
        pAtk: {
            type: Number,
            default: 1
        },
        pDef: {
            chest: {
                type: Number,
                default: 1
            },
            legs: {
                type: Number,
                default: 1
            },
            head: {
                type: Number,
                default: 1
            },
            feet: {
                type: Number,
                default: 1
            },
            gloves: {
                type: Number,
                default: 1
            },
            underwear: {
                type: Number,
                default: 1
            },
            cloak: {
                type: Number,
                default: 1
            }
        },
        mAtk: {
            type: Number,
            default: 1
        },
        mDef: {
            rear: {
                type: Number,
                default: 1
            },
            lear: {
                type: Number,
                default: 1
            },
            rFinger: {
                type: Number,
                default: 1
            },
            lFinger: {
                type: Number,
                default: 1
            },
            neck: {
                type: Number,
                default: 1
            }
        },
        breath: {
            type: Number,
            default: 100
        }
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Characters', Characters);
