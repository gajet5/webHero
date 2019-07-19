const { Markup } = require('telegraf');

module.exports = {
    getCloseInventaryKeyboard() {
        return Markup.keyboard([
            '❌ Закрыть инвентарь'
        ]).oneTime(true).resize().extra();
    }
};