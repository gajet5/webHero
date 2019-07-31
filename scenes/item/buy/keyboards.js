const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },
    count() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('1', JSON.stringify({
                act: 'buy',
                cnt: 1
            })),
            Markup.callbackButton('5', JSON.stringify({
                act: 'buy',
                cnt: 5
            })),
            Markup.callbackButton('10', JSON.stringify({
                act: 'buy',
                cnt: 10
            })),
            Markup.callbackButton('25', JSON.stringify({
                act: 'buy',
                cnt: 25
            })),
            Markup.callbackButton('50', JSON.stringify({
                act: 'buy',
                cnt: 50
            })),
            Markup.callbackButton('100', JSON.stringify({
                act: 'buy',
                cnt: 100
            }))
        ], { columns: 2 }).extra();
    }
};
