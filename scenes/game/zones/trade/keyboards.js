const { Markup } = require('telegraf');

module.exports = {
    getInlineKeyboard(actions) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Покупка', 'buy'),
            Markup.callbackButton('Продажа', 'sell')
        ], { columns: 1 }).extra();
    },
    getKeyboard() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
