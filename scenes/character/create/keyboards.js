const { Markup } = require('telegraf');

module.exports = {
    getStatsKeyboard() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Раскидать статы', 'getStats'),
        ]).extra();
    },
    getGameAccountKeyboard() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Играть', 'gameZonesRouter'),
            Markup.callbackButton('Вернуться назад', 'account'),
        ]).extra();
    }
};