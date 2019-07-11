const Telegraf = require('telegraf');
const Session = require('telegraf/session');
const path = require('path');

const config = require(path.join(__basedir, 'config'));
const stage = require(path.join(__basedir, 'scenes'))();

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);

        Bot.use(Session());
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
