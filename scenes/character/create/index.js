const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

const characterCreateMessage = require(path.join(__basedir, 'data', 'dialogues', 'character', 'create'));

const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));

const characterCreate = new Scene('characterCreate');

characterCreate.enter(async (ctx) => {
    await ctx.reply(characterCreateMessage.startDialog());
    await ctx.reply(characterCreateMessage.startCreateCharacter(), keyboards.getStatsKeyboard());
});

characterCreate.action(/getStatsCharacter/, commands.getStats);

characterCreate.leave((ctx) => {
    ctx.session.scenes.previous = ctx.session.__scenes.current;
    sceneCleaner(ctx);
});

module.exports = characterCreate;
