const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const gameNew = new Scene('gameNew');

gameNew.enter(async (ctx) => {
    ctx.session.scene.currentScene = 'gameNew';
    await ctx.reply(`Вступление новой игры`);
});

gameNew.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = 'gameNew';
});

module.exports = gameNew;
