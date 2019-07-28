const path = require('path');
const Scene = require('telegraf/scenes/base');

module.exports = new Scene('gameZonesTradeBuyList')
    .enter(async (ctx) => {

    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
