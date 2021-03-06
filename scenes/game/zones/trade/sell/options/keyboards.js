const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },

    selectOption() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Продать вещь', 'sellOne'),
            Markup.callbackButton('Продать хлам', 'sellMany')
        ], { columns: 1 }).extra();
    },
};
