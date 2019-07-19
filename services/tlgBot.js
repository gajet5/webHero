const Telegraf = require('telegraf');
const TlgfLocalSession = require('telegraf-session-local');
const path = require('path');

const config = require(path.join(__basedir, 'config'));
const stage = require(path.join(__basedir, 'scenes'))();

const initUserMiddleware = require(path.join(__basedir, 'middlewares', 'initUser'));

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);

        Bot.use((new TlgfLocalSession({
            database: path.join(__basedir, 'sessions', 'index.json')
        })).middleware());

        Bot.use(stage.middleware());
        Bot.use(initUserMiddleware);

        if (config.telegram.log) {
            Bot.use(Telegraf.log());
        }

        return Bot;
    },

    initializeTlgBot(Bot) {
        if (config.telegram.debugCommands) {
            Bot.command('renew', async ctx => ctx.scene.reenter());
            Bot.command('exit', async ctx => ctx.scene.leave());
            Bot.command('scene', async ctx => await ctx.reply(`Текущая сцена: ${ctx.session.__scenes.current}`));
        }

        Bot.start(async ctx => await ctx.scene.enter('account'));
        return Bot.launch();
    }
};
