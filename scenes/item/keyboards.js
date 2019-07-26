const { Markup } = require('telegraf');

module.exports = {
    buy(id) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Купить', JSON.stringify({
                act: 'buy',
                id
            }))
        ], { columns: 1 }).extra();
    }
};
