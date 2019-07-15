const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const sceneName = 'gameStart';
const gameNew = new Scene(sceneName);

gameNew.enter(async (ctx) => {
    ctx.session.scene.currentScene = sceneName;
    await ctx.reply(`Вступление новой игры`);
});

gameNew.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = sceneName;
});

module.exports = gameNew;
