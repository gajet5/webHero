const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },

    buy(id, prevScene) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Купить', JSON.stringify({
                act: 'buy',
                id
            }), !/[t|T]rade/.test(prevScene))
        ], { columns: 1 }).extra();
    },
};
