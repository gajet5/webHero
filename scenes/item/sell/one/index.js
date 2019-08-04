const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('itemSellOne')
    .enter(async ctx => {
        const msgs = [];
        const inventory = await charactersItemsModel.find({ ownerId: ctx.session.character.id });

        msgs.push(await ctx.reply('Chouise item for sale.', keyboards.back()));

        for (let item of inventory) {
            if (!item.canSell) {
                continue;
            }

            const itemForSell = itemsData[item.category][item.itemId];
            const priceForSell = Math.round(itemForSell.price / 2);

            msgs.push(await ctx.reply(`
Name: ${ itemForSell.name }
Count: ${ item.count }
Price: ${ priceForSell }
            `));
        }

        ctx.session.messages.push(...msgs);
    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });