const { Markup } = require('telegraf');

module.exports = {
    actions(actions) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Покупка', 'gameZonesTradeBuyCategory'),
            Markup.callbackButton('Продажа', 'gameZonesTradeSellOptions')
        ], { columns: 1 }).extra();
    },
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
