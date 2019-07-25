const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesTradeBuy')
    .enter(async function(ctx) {
        const msgs = [];

        msgs.push(await ctx.reply('.', keyboards.back()));
        msgs.push(await ctx.reply('Какой товар вас может заинтерисовать?', keyboards.category()));

        ctx.session.messages.push(...msgs);
    })
    .action(/weapons|armors|etc/, ctx => {
        sceneCleaner(ctx);
        actions.showCategory(ctx);
    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
