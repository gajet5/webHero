const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },
    findEnemy() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Обыскать територию', 'findEnemy')
        ], { columns: 1 }).extra();
    }
};