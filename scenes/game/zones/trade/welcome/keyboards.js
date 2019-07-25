const { Markup } = require('telegraf');

module.exports = {
    getInlineKeyboard(actions) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Покупка', 'gameZonesTradeBuy'),
            Markup.callbackButton('Продажа', 'gameZonesTradeSell')
        ], { columns: 1 }).extra();
    },
    getBackKeyboard() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
