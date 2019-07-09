const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const Session = require('telegraf/session');
const path = require('path');

const config = require(path.join(__basedir, 'config'));

const startScene = require(path.join(__basedir, 'scenes', 'start'));

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);
        const stage = new Stage([
            startScene
        ]);

        Bot.use(Session());
        Bot.use(stage.middleware());

        if (config.telegram.log) {
            Bot.use(Telegraf.log());
        }

        return Bot;
    },

    initializeTlgBot(Bot) {
        Bot.start(async ctx => ctx.scene.enter('start'));

        return Bot.launch();
    }
};
