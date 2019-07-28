const { Markup } = require('telegraf');

module.exports = {
    inspect(id) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Осмотреть', 'inspect'),
        ], { columns: 1 }).extra();
    },
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
