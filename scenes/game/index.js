const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const game = new Scene('game');

game.enter(async (ctx) => {
    const account = await accountsModel.findById(ctx.session.account.id);
    const character = await charactersModel.findById(ctx.session.character.id);

    if (account.firstTime) {
        await ctx.scene.enter('gameEventsStart');

    }

    switch (character.zone) {
        case 'town':
            await ctx.scene.enter('gameZoneTown');
            break;
        default:
            await ctx.reply(`Игровой зоны не существует`);
            await ctx.scene.enter('account');
    }

    // if (!character.zone) {
    //     await ctx.scene.enter('gameEventsStart');
    // } else {
    //     await ctx.scene.enter('game');
    // }

});

module.exports = game;
