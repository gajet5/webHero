const path = require('path');
const Scene = require('telegraf/scenes/base');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('itemSellOne')
    .enter(async function(ctx) {
        const msgs = [];
        const item = itemsData[ctx.session.state.sellItemCategory][ctx.session.state.sellItemId];

        msgs.push(await ctx.reply(`
Выюрано: ${item.name}
В наличие: ${ctx.session.state.sellItemCount} 
        `, keyboards.back()));
        msgs.push(await ctx.reply(`Сколько продаём?`, keyboards.count()));

        ctx.session.messages.push(...msgs);
    })
    .action(/sell/, actions.buyItem)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
