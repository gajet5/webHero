const path = require('path');
const Scene = require('telegraf/scenes/base');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesItemInspect')
    .enter(async function(ctx) {
        const msgs = [];
        const item = itemsData[ctx.session.state.tradeBuyCategory][ctx.session.state.inspectItemId];

        msgs.push(await ctx.reply('.', keyboards.back()));
        msgs.push(await ctx.reply(`
Название: ${item.name}
Цена: ${item.price}
Характеристики: 
    Физ. Урон: ${item.stats.pAtk}
    Маг. Урон: ${item.stats.mAtk}
    Крит урон: ${item.stats.critRate}
        `));

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
