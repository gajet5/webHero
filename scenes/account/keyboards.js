const { Markup } = require('telegraf');

module.exports = {
    getKeyboard(haveCharacter = false) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Создать персонажа', 'characterCreate', haveCharacter),
            Markup.callbackButton('Играть персонажем', 'characterPlay', !haveCharacter),
            Markup.callbackButton('Удалить персонажа', 'characterDelete', !haveCharacter),
        ], { columns: 1 }).extra();
    }
};