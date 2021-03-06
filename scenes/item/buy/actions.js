const path = require('path');

const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));
const itemsData = require(path.join(__basedir, 'data', 'items'));

module.exports = {
    async buyItem(ctx) {
        const msgs = [];
        const data = JSON.parse(ctx.callbackQuery.data);
        const character = ctx.session.character.id;
        const category = ctx.session.state.buyItemCategory;
        const itemId = ctx.session.state.buyItemId;
        const item = itemsData[category][itemId];

        let money = 0;
        let characterMoney = await charactersItemsModel.findOne({
            owner: character,
            itemId: '1',
            category: 'etc'
        });

        if (characterMoney) {
            money = characterMoney.count;
        }

        const moneyRequired = data.cnt * item.price;

        if (money < moneyRequired) {
            msgs.push(await ctx.reply('Недостаточно редств для покупки'));
            ctx.session.messages.push(...msgs);
            return;
        }

        const invItem = await charactersItemsModel.findOne({
            owner: character,
            itemId,
            category
        });

        if (invItem) {
            await invItem.updateOne({
                count: invItem.count + data.cnt
            });
            await characterMoney.updateOne({
                count: money - moneyRequired
            });
        } else {
            await charactersItemsModel.create({
                owner: character,
                itemId,
                category,
                type: item.type || 'null',
                count: data.cnt,
                autoSell: item.specifications.autoSell,
                canSell: item.specifications.canSell
            });
        }
        msgs.push(await ctx.reply('Покупка совершена'));
        ctx.session.messages.push(...msgs);
    }
};