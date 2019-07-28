const { Markup } = require('telegraf');

module.exports = {
    inspect(id) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Осмотреть', JSON.stringify({
                act: 'inspect',
                id
            })),
        ], { columns: 1 }).extra();
    },
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
