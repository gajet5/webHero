const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const gameNew = new Scene('gameEventsStart');

gameNew.enter(async (ctx) => {
    await ctx.reply(`Вступление новой игры`);
    await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
        zone: 'talkingIslandTown'
    });

    ctx.scene.enter('gameZone')
});

module.exports = gameNew;
