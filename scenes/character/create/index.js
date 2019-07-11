const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));
const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const characterCreateMessage = require(path.join(__basedir, 'data', 'dialogues', 'character', 'create'));

const characterCreate = new Scene('characterCreate');

characterCreate.enter(async (ctx) => {
    ctx.session.scene.currentScene = 'characterCreate';
    await ctx.reply(characterCreateMessage.startDialog());
    await commonUtils.sleep(1);
    await ctx.reply('Настало время кинуть кости и посмотреть как лягут статы', keyboards.getStatsKeyboard());
});

characterCreate.command('exit', async ctx => ctx.scene.leave());

characterCreate.action(/getStatsCharacter/, commands.getStats);

characterCreate.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = 'characterCreate';
});

module.exports = characterCreate;
