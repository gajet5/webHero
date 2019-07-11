const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const commands = require(path.join(__basedir, 'scenes', 'account', 'commands'));
const keyboards = require(path.join(__basedir, 'scenes', 'account', 'keyboards'));
const welcomeMessage = require(path.join(__basedir, 'data', 'dialogues', 'account', 'welcome'));

const start = new Scene('account');

start.enter(async (ctx) => {
    ctx.session.currentScene = 'account';

    if (ctx.from) {
        const user = await accountsModel.findOne({
            userId: ctx.from.id
        });

        if (user) {
            await ctx.reply(welcomeMessage.alreadyRegistered(user.username), keyboards.getKeyboard(user.haveCharacter));
            return;
        }

        const newUser = await accountsModel.create({
            userId: ctx.from.id,
            chatId: ctx.chat.id,
            firsName: ctx.from.first_name,
            username: ctx.from.username
        });

        if (user) {
            await ctx.reply(welcomeMessage.newUser(newUser.firsName, newUser.username), keyboards.getKeyboard(user.haveCharacter));
        }
    }
});

start.command('exit', async ctx => ctx.scene.leave());
start.action(/characterCreate/, commands.swichScene);
start.action(/characterPlay/, commands.swichScene);
start.action(/characterDelete/, commands.swichScene);

start.leave(ctx => {
    ctx.session.previousScene = 'account';
});

module.exports = start;