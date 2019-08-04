const path = require('path');
const Scene = require('telegraf/scenes/base');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('itemInspect')
    .enter(async function(ctx) {
        const itemId = ctx.session.state.inspectItemId;
        const msgs = [];
        const item = itemsData[ctx.session.state.tradeBuyCategory][itemId];

        msgs.push(await ctx.reply(`
Название: ${item.name}
Цена: ${item.price}
        `, keyboards.back()));

        if (item.stats) {
            msgs.push(await ctx.reply(`
Характеристики: 
    Физ. Урон: ${item.stats.pAtk}
    Маг. Урон: ${item.stats.mAtk}
    Крит урон: ${item.stats.critRate}
        `, keyboards.buy(itemId, ctx.session.scenes.previous)));
        } else {
            msgs.push(await ctx.reply(`
Характеристики отсутсвуют
        `, keyboards.buy(itemId, ctx.session.scenes.previous)));
        }

        ctx.session.messages.push(...msgs);
    })
    .action(/buy/, actions.buyItem)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter('gameZonesTradeBuyList');
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
