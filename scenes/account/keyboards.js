const { Extra } = require('telegraf');

module.exports = {
    getKeyboard(haveCharacter = false) {
        return Extra.HTML().markup(markup => {
            return markup.inlineKeyboard([
                markup.callbackButton('Создать персонажа', 'characterCreate', haveCharacter),
                markup.callbackButton('Играть персонажем', 'characterPlay', !haveCharacter),
                markup.callbackButton('Удалить персонажа', 'characterDelete', !haveCharacter),
            ]);
        });
    }
};