const { Markup } = require('telegraf');

module.exports = {
    actions(id) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Осмотреть', JSON.stringify({
                act: 'insp',
                id
            })),
            Markup.callbackButton('Купить', JSON.stringify({
                act: 'buy',
                id
            }))
        ], { columns: 1 }).extra();
    },
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
