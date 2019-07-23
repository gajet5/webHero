const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('characterCreate')
    .enter(async (ctx) => {
        await ctx.reply(`Добро пожаловать в меню создания персонажа.`);
        await ctx.reply(`Настало время кинуть кости и посмотреть как лягут статы.`, keyboards.getStatsKeyboard());
    })
    .action(/getStats/, commands.getStats)
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
