const { Markup } = require('telegraf');

module.exports = {
    actions(id) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Осмотреть', JSON.stringify({
                ac: 'ins',
                id
            })),
            Markup.callbackButton('Купить', JSON.stringify({
                ac: 'buy',
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
