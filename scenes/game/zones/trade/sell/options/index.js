const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('gameZonesTradeSellOptions')
    .enter(async (ctx) => {
        const msgs = [];

        msgs.push(await ctx.reply('.', keyboards.back()));
        msgs.push(await ctx.reply(`Выберите опцию:`, keyboards.selectOption()));

        ctx.session.messages.push(...msgs);
    })
    .action(/sellOne/, ctx => ctx.scene.enter('gameZonesTradeSellList'))
    .action(/sellMany/, ctx => ctx.scene.enter('itemSellMany'))
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter('gameZonesTradeWelcome');
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
