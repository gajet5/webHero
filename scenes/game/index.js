const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const game = new Scene('game');

game.enter(async (ctx) => {
    /*
    * 1) Новый или старый игрок
    * 2) В какой зоне он находится
    * 3) Какие действия он может совершить
    * */
    ctx.session.scene.currentScene = 'game';
    await ctx.reply(`Игровая главная сцена`);
});

game.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = 'game';
});

module.exports = game;
