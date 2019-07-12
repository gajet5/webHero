const path = require('path');
const Scene = require('telegraf/scenes/base');

const characterDelete = new Scene('characterDelete');

characterDelete.enter(async (ctx) => {
    await ctx.reply('Добро пожаловать в сцену удаления персонажа.')
});

module.exports = characterDelete;
