const { Markup } = require('telegraf');

module.exports = {
    findEnemy() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Обыскать територию', 'findEnemy')
        ], { columns: 1 }).extra();
    },

    actionWithEnemy() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Сбежать', 'goToTown'),
            Markup.callbackButton('Напасть', 'attack')
        ], { columns: 1 }).extra();
    }
};