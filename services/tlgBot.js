const Telegraf = require('telegraf');
const TlgfLocalSession = require('telegraf-session-local');
const path = require('path');

const config = require(path.join(__basedir, 'config'));
const stage = require(path.join(__basedir, 'scenes'))();

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);

        Bot.use((new TlgfLocalSession({
            database: path.join(__basedir, 'sessions', 'db.json')
        })).middleware());

        Bot.use(stage.middleware());

        if (config.telegram.log) {
            Bot.use(Telegraf.log());
        }

        return Bot;
    },

    initializeTlgBot(Bot) {
        Bot.start(async ctx => ctx.scene.enter('account'));
        return Bot.launch();
    }
};
