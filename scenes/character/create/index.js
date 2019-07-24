const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

const actions = require(path.join(__dirname, 'actions'));
const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('characterCreate')
    .enter(async (ctx) => {
        const msgs = [];

        msgs.push(await ctx.reply(`Добро пожаловать в меню создания персонажа.`));
        msgs.push(await ctx.reply(`Настало время кинуть кости и посмотреть как лягут статы.`, keyboards.getStatsKeyboard()));

        ctx.session.messages.push(...msgs);
    })
    .action(/getStats/, actions.getStats)
    .action(/gameZonesRouter|account/, ctx => ctx.scene.enter(ctx.callbackQuery.data))
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
