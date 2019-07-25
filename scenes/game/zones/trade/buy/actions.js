const path = require('path');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = {
    async showCategory(ctx) {
        const character = await charactersModel.findById(ctx.session.character.id);
        const zoneData = await getZoneData(character);
        const categoryName = ctx.callbackQuery.data;
        const buylist = zoneData.buylist[categoryName];
        const itemsList = [];

        buylist.forEach(id => {
            itemsList.push(itemsData[categoryName][id]);
        });

        for (let item of itemsList) {
            ctx.session.messages.push(await ctx.reply(`
Название: ${item.name}
Цена: ${item.price}
            `, keyboards.inspect(item)));
        }
    },
    async buy(ctx) {

    }
};