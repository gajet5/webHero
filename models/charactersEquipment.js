const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersEquipment = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Characters',
        require: true
    },
    weapons: {
        lHand: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'weapons'
            },
            itemId: {
                type: Number,
            },
            pAtk: {
                type: Number,
                default: 1
            },
            mAtk: {
                type: Number,
                default: 1
            }
        },
        rHand: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'weapons'
            },
            itemId: {
                type: Number,
            },
            pAtk: {
                type: Number,
                default: 1
            },
            mAtk: {
                type: Number,
                default: 1
            }
        },
    },
    armors: {
        chest: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        legs: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        head: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        feet: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        gloves: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        underwear: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        cloak: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        rear: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        lear: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        rFinger: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        lFinger: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        },
        neck: {
            equipped: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'armors'
            },
            itemId: {
                type: Number,
            },
            pDef: {
                type: Number,
                default: 1
            },
            mDef: {
                type: Number,
                default: 1
            }
        }
    }
});

module.exports = mongoose.model('CharactersEquipment', CharactersEquipment);
