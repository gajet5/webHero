const path = require('path');

const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));
const itemsData = require(path.join(__basedir, 'data', 'items'));

module.exports = {
    async buyItem(ctx) {
        const msgs = [];
        const data = JSON.parse(ctx.callbackQuery.data);
        const character = ctx.session.character.id;
        const category = ctx.session.state.sellItemCategory;
        const itemId = ctx.session.state.sellItemId;
        const item = itemsData[category][itemId];
        const sellPrice = Math.round(item.price / 2);

        let characterMoney = await charactersItemsModel.findOne({
            owner: character,
            itemId: '1',
            category: 'etc'
        });

        const itemInInventory = await charactersItemsModel.findOne({
            owner: character,
            category,
            itemId
        });

        if (data.cnt > itemInInventory.count) {
            msgs.push(await ctx.reply('У тебя нет столько вещей.'));
            return false;
        }

        await itemInInventory.updateOne({
            count: itemInInventory.count - data.cnt
        });

        await characterMoney.updateOne({
            count: characterMoney.count + (sellPrice * data.cnt)
        });

        msgs.push(await ctx.reply('Продажа совершена'));
        ctx.session.messages.push(...msgs);
    }
};