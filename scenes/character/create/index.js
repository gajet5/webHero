const Scene = require('telegraf/scenes/base');

const characterCreate = new Scene('characterCreate');

characterCreate.enter(async (ctx) => {
    ctx.session.currentScene = 'characterCreate';
    await ctx.reply('Добро пожаловать в сцену создания персонажа.')
});

characterCreate.command('exit', async ctx => ctx.scene.leave());

module.exports = characterCreate;
