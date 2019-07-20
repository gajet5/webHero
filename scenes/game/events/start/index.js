const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const gameNew = new Scene('gameEventsStart');

gameNew.enter(async (ctx) => {
    await ctx.reply(`Вступление новой игры`);

    await accountsModel.findByIdAndUpdate(ctx.session.account.id, {
        firstTime: false
    });

    await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
        mapRegion: 'talkingIsland',
        zone: 'town'
    });

    await ctx.scene.enter('game')
});

module.exports = gameNew;
