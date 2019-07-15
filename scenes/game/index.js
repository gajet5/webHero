const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const sceneName = 'game';
const game = new Scene(sceneName);

game.enter(async (ctx) => {
    /*
    * 1) Новый или старый игрок
    * 2) В какой зоне он находится
    * 3) Какие действия он может совершить
    * */
    ctx.session.scene.currentScene = sceneName;
    await ctx.reply(`Игровая главная сцена`);
});

game.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = sceneName;
});

module.exports = game;
