const path = require('path');

module.exports = {
    info: {
        img: path.join(__dirname, '..', 'media', 'img', 'ti_merchant.jpg'),
        description: 'Описание торговой прощади города'
    },
    actions: {
        buyItems: {
            text: 'Купить',
            handler: async (ctx) => {
                await ctx.reply('Торговать ага ща, разбежался');
            }
        },
        sellItems: {
            text: 'Продать',
            handler: async (ctx) => {}
        }
    }
};
