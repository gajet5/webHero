const { Markup } = require('telegraf');

module.exports = {
    getKeyboard(actions) {
        let keyboards = [];

        for (let action in actions) {
            keyboards.push(Markup.callbackButton(actions[action].text, action))
        }

        return Markup.inlineKeyboard(keyboards, { columns: 1 }).extra();
    },
    getCharacterActionKeyboard() {
        return Markup.keyboard([
            '🎒 Инвентарь'
        ]).oneTime(true).resize().extra();
    }
};
