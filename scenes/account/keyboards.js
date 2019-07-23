const { Markup } = require('telegraf');

module.exports = {
    getKeyboard(haveCharacter = false) {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Создать персонажа', JSON.stringify({
                command: 'switchScene',
                sceneName: 'characterCreate'
            }), haveCharacter),
            Markup.callbackButton('Играть персонажем', JSON.stringify({
                command: 'switchScene',
                sceneName: 'characterPlay'
            }), !haveCharacter),
            Markup.callbackButton('Удалить персонажа', JSON.stringify({
                command: 'switchScene',
                sceneName: 'characterRemove'
            }), !haveCharacter),
        ], { columns: 1 }).extra();
    }
};