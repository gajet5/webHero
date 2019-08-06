const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));

const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesTradeSellList')
    .enter(async ctx => {
        const msgs = [];
        const inventory = await charactersItemsModel.find({ owner: ctx.session.character.id });

        msgs.push(await ctx.reply('Что хотите продать?', keyboards.back()));

        for (let item of inventory) {
            if (!item.canSell) {
                continue;
            }

            const itemForSell = itemsData[item.category][item.itemId];
            const priceForSell = Math.round(itemForSell.price / 2);

            msgs.push(await ctx.reply(`
Имя: ${ itemForSell.name }
Колчиство: ${ item.count }
Цена за шт.: ${ priceForSell }
            `, keyboards.sellItem(item.itemId, item.category, item.count)));
        }

        ctx.session.messages.push(...msgs);
    })
    .action(/sell/, actions.sellItem)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter('gameZonesTradeSellOptions');
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });