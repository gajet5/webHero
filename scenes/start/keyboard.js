const { Extra } = require('telegraf');

module.exports = {
    getStartKeyboard(status) {
        return Extra.HTML().markup(markup => {
            const newUser = status === 'new';

            return markup.inlineKeyboard([
                markup.callbackButton('Создать персонажа', 'createCharacter', !newUser),
                markup.callbackButton('Играть персонажем', 'playCharacter', newUser),
                markup.callbackButton('Удалить персонажа', 'deleteCharacter', false),
            ]);
        });
    }
};