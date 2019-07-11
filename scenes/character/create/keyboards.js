const { Extra } = require('telegraf');

module.exports = {
    getStatsKeyboard() {
        return Extra.HTML().markup(markup => {
            return markup.inlineKeyboard([
                markup.callbackButton('Раскидать статы', 'getStatsCharacter'),
            ]);
        });
    }
};