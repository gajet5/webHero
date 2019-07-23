const { Markup } = require('telegraf');

module.exports = {
    getStatsKeyboard() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Раскидать статы', 'getStats'),
        ]).extra();
    },
    getGameAccountKeyboard() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Играть', JSON.stringify({
                command: 'switchScene',
                sceneName: 'gameZonesRouter'
            })),
            Markup.callbackButton('Вернуться назад', JSON.stringify({
                command: 'switchScene',
                sceneName: 'account'
            })),
        ]).extra();
    }
};