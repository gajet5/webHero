const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const path = require('path');

const config = require(path.join(__basedir, 'config'));
const { startHandler, settingsHandler, helpHandler } = require(path.join(__basedir, 'commands', 'standarts'));
const cmdList = require(path.join(__basedir, 'commands', 'list'));

module.exports = {
    createTlgBot() {
        const Bot = new Telegraf(config.telegram.TOKEN);

        if (config.telegram.log) {
            Bot.use(Telegraf.log());
        }

        return Bot;
    },
    initializeTlgBot(Bot) {
        Bot.command(cmdList.getCmdStr('start'), startHandler);
        Bot.command(cmdList.getCmdStr('settings'), settingsHandler);
        Bot.command(cmdList.getCmdStr('help'), helpHandler);
        return Bot.launch();
    }
};
