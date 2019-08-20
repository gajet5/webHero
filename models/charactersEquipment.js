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
            }
        }
    }
});

module.exports = mongoose.model('CharactersEquipment', CharactersEquipment);
