const Telegraf = require('telegraf');
const TlgfLocalSession = require('telegraf-session-local');
const path = require('path');

const config = require(path.join(__basedir, 'config'));
const stage = require(path.join(__basedir, 'scenes'))();

const initSessionMiddleware = require(path.join(__basedir, 'middlewares', 'initSession'));
const msgRegisterationMiddleware = require(path.join(__basedir, 'middlewares', 'msgRegisteration'));

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);

        Bot.use((new TlgfLocalSession({
            database: path.join(__basedir, 'sessions', 'index.json')
        })).middleware());

        Bot.use(stage.middleware());
        Bot.use(initSessionMiddleware);
        Bot.use(msgRegisterationMiddleware);

        if (config.telegram.log) {
            Bot.use(Telegraf.log());
        }

        return Bot;
    },

    initializeTlgBot(Bot) {
        if (config.telegram.debugCommands) {
            Bot.command('renew', async ctx => ctx.scene.reenter());
            Bot.command('exit', async ctx => ctx.scene.leave());
            Bot.command('scene', async ctx => ctx.session.messages.push(await ctx.reply(`Текущая сцена: ${ctx.session.__scenes.current}`)));
        }

        Bot.start(async ctx => {
            // if (/[H|h]unting/.test(ctx.session.__scenes.current)) {
            //     ctx.session.messages.push(await ctx.reply('Действие недоступно.'));
            //     return false;
            // }
            await ctx.scene.enter('account');
        });
        return Bot.launch();
    }
};
