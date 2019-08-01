const { Markup } = require('telegraf');

module.exports = {
    getInlineKeyboard(actions) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Покупка', 'gameZonesTradeBuyCategory'),
            Markup.callbackButton('Продажа', 'gameZonesTradeSellOptions')
        ], { columns: 1 }).extra();
    },
    getBackKeyboard() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
