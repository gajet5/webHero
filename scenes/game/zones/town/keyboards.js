const { Markup } = require('telegraf');

module.exports = {
    options(actions) {
        let keyboards = [];

        for (let action in actions) {
            keyboards.push(Markup.callbackButton(actions[action], action))
        }

        return Markup.inlineKeyboard(keyboards, { columns: 1 }).extra();
    },
    characterAction() {
        return Markup.keyboard([
            '🎒 Инвентарь'
        ]).oneTime(true).resize().extra();
    }
};
