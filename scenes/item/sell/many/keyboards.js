const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },
    sellTrash() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('ОК', 'sellTrash')
        ], { columns: 1 }).extra();
    }
};
