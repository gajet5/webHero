const path = require('path');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const welcomeMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'welcomeMessage'));
const settingsMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'settingsMessage'));
const helpMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'helpMessage'));

module.exports = {
    async startHandler(ctx) {
        if (ctx.from) {
            const user = await accountsModel.findOne({
                userId: ctx.from.id
            });

            if (user) {
                ctx.reply(welcomeMessage.alreadyRegistered(user.username));
                ctx.reply('ты шо!');
                return;
            }

            const newUser = await accountsModel.create({
                userId: ctx.from.id,
                chatId: ctx.chat.id,
                firsName: ctx.from.first_name,
                username: ctx.from.username
            });

            if (user) {
                ctx.reply(welcomeMessage.newUser(newUser.firsName, newUser.username));
            }

            ctx.reply('ты шо!')
        }
    },

    async settingsHandler(ctx) {
        ctx.reply(settingsMessage);
    },
    async helpHandler(ctx) {
        ctx.reply(helpMessage);
    }
};