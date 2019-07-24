const path = require('path');

module.exports = {
    info: {
        img: path.join(__dirname, '..', 'media', 'img', 'ti_town.jpg'),
        description: 'Описание деревни в которой оказывается наш герой'
    },
    actions: {
        getMerchants: 'Торговать',
        getInformations: 'Распросить местных',
        goHunting: 'Охота',
        goAnotherTown: 'Отправиться в другой город'
    }
};
