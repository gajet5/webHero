const path = require('path');
const Scene = require('telegraf/scenes/base');

const commonUtils = require(path.join(__basedir, 'utils', 'common'));
const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const characterCreateMessage = require(path.join(__basedir, 'data', 'dialogues', 'character', 'create'));

const characterCreate = new Scene('characterCreate');

characterCreate.enter(async (ctx) => {
    await ctx.reply(characterCreateMessage.startDialog());
    await commonUtils.sleep(1);
    await ctx.reply(characterCreateMessage.startCreateCharacter(), keyboards.getStatsKeyboard());
});

characterCreate.action(/getStatsCharacter/, commands.getStats);

module.exports = characterCreate;
