const { Markup } = require('telegraf');

module.exports = {
    category() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Оружие', 'weapons'),
            Markup.callbackButton('Броня', 'armors'),
            Markup.callbackButton('Остальное', 'etc')
        ], { columns: 1 }).extra();
    },
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    }
};
