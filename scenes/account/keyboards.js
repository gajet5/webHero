const { Extra } = require('telegraf');

module.exports = {
    getKeyboard(haveCharacter = false) {
        return Extra.HTML().markup(markup => {
            return markup.inlineKeyboard([
                markup.callbackButton('Создать персонажа', 'createCharacter', haveCharacter),
                markup.callbackButton('Играть персонажем', 'playCharacter', !haveCharacter),
                markup.callbackButton('Удалить персонажа', 'deleteCharacter', !haveCharacter),
            ]);
        });
    }
};