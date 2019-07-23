const { Markup } = require('telegraf');

module.exports = {
    getInlineKeyboard(actions) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Покупка', 'armor'),
            Markup.callbackButton('Продажа', 'sell'),
            Markup.callbackButton('Продажа', 'sell')
        ], { columns: 1 }).extra();
    },
    getKeyboard() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
