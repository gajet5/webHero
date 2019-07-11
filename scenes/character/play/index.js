const path = require('path');
const Scene = require('telegraf/scenes/base');

const characterPlay = new Scene('characterPlay');

characterPlay.enter(async (ctx) => {
    await ctx.reply('Добро пожаловать в сцену подрузки персонажа.')
});

characterPlay.command('exit', async ctx => ctx.scene.leave());

module.exports = characterPlay;
