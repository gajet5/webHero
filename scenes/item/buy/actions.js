const path = require('path');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));
const itemsData = require(path.join(__basedir, 'data', 'items'));

module.exports = {
    async buyItem(ctx) {
        const msgs = [];
        const data = JSON.parse(ctx.callbackQuery.data);
        const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
        const category = ctx.session.state.tradeBuyCategory;
        const itemId = ctx.session.state.buyItemId;
        const item = itemsData[category][itemId];

        let money = 0;
        let invMoney = await charactersItemsModel.findOne({
            ownerId: character.id,
            itemId: '1',
            category: 'etc'
        });

        if (invMoney) {
            money = invMoney.count;
        }

        const moneyRequired = data.cnt * item.price;

        if (money < moneyRequired) {
            msgs.push(await ctx.reply('Недостаточно редств для покупки'));
            return;
        }

        const invItem = await charactersItemsModel.findOne({
            ownerId: character.id,
            itemId,
            category
        });

        if (invItem) {
            invItem.update({
                count: data.ctn
            });
            invMoney.update({
                count: money - moneyRequired
            });
        } else {
            await charactersItemsModel.create({
                ownerId: character.id,
                itemId,
                category,
                type: item.type || 'null',
                count: data.ctn
            });
        }
        msgs.push(await ctx.reply('Покупка совершена'));
        ctx.session.messages.push(...msgs);
    }
};