const path = require('path');
const Scene = require('telegraf/scenes/base');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('itemBuy')
    .enter(async function(ctx) {
        const msgs = [];
        const item = itemsData[ctx.session.state.tradeBuyCategory][ctx.session.state.buyItemId];

        msgs.push(await ctx.reply(`Вы выбрали: ${item.name}`, keyboards.back()));
        msgs.push(await ctx.reply(`Сколько нужно?`, keyboards.count()));

        ctx.session.messages.push(...msgs);
    })
    .action(/buy/, actions.buyItem)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
