const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },

    sellItem(id, ct, cn) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Продать', JSON.stringify({
                ac: 'sell',
                id,
                ct,
                cn
            })),
        ], { columns: 1 }).extra();
    }
};
