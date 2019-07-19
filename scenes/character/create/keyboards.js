const { Markup } = require('telegraf');

module.exports = {
    getStatsKeyboard() {
        return Markup.inlineKeyboard([
            Markup.callbackButton('Раскидать статы', 'getStatsCharacter'),
        ]).extra();
    }
};