const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = new Scene('characterPlay')
    .enter(async (ctx) => {
        const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
        ctx.session.character.id = character.id;
        await ctx.scene.enter('gameZonesRouter');
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
