const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const sceneName = 'gameStart';
const gameNew = new Scene(sceneName);

gameNew.enter(async (ctx) => {
    ctx.session.scene.current = sceneName;
    await ctx.reply(`Вступление новой игры`);
});

gameNew.leave(ctx => {
    ctx.session.scene.current = '';
    ctx.session.scene.previous = sceneName;
});

module.exports = gameNew;
