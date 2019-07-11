const path = require('path');
const Scene = require('telegraf/scenes/base');

const characterDelete = new Scene('characterDelete');

characterDelete.enter(async (ctx) => {
    await ctx.reply('Добро пожаловать в сцену удаления персонажа.')
});

characterDelete.command('exit', async ctx => ctx.scene.leave());

module.exports = characterDelete;
