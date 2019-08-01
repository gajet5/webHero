const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },

    selectOption() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Продать вещь', 'itemSellOne'),
            Markup.callbackButton('Продать хлам', 'itemSellMany')
        ], { columns: 1 }).extra();
    },
};
