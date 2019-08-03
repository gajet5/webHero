const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('itemSellMany')
    .enter(async ctx => {
        const msgs = [];

        msgs.push(await ctx.reply('.', keyboards.back()));
        msgs.push(await ctx.reply('Вы уверены что хотите продать весь хлам?', keyboards.sellTrash()));

        ctx.session.messages.push(...msgs);
    })
    .action(/sellTrash/, actions.sellTrash)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });