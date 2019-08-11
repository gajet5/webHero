const { Markup } = require('telegraf');

module.exports = {
    back() {
        return Markup.keyboard([
            '⬅ Вернуться'
        ]).oneTime(true).resize().extra();
    },
    getZones(zones) {
        const keyboard = [];

        for (let zone in zones) {
            keyboard.push(Markup.callbackButton(zones[zone].info.name, JSON.stringify({
                act: 'go',
                id: zone
            })));
        }

        return Markup.inlineKeyboard(keyboard, { columns: 1 }).extra();
    }
};