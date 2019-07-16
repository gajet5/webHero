const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const accountMessage = require(path.join(__basedir, 'data', 'dialogues', 'account'));

const sceneName = 'account';
const start = new Scene(sceneName);

start.enter(async (ctx) => {
    ctx.session.scene.current = sceneName;

    if (ctx.from) {
        let account = await accountsModel.findOne({
            userId: ctx.from.id
        });

        if (!account) {
            account = await accountsModel.create({
                userId: ctx.from.id,
                chatId: ctx.chat.id,
                firsName: ctx.from.first_name,
                username: ctx.from.username
            });
        }

        ctx.session.account.id = account.id;

        if (account.haveCharacter) {
            await ctx.reply(accountMessage.alreadyRegistered(account.username), keyboards.getKeyboard(account.haveCharacter));
        } else {
            await ctx.reply(accountMessage.newUser(account.firsName, account.username), keyboards.getKeyboard(account.haveCharacter));
        }
    }
});

start.action(/characterCreate/, commands.swichScene);
start.action(/characterPlay/, commands.swichScene);
start.action(/characterDelete/, commands.swichScene);

start.leave(ctx => {
    ctx.session.scene.current = '';
    ctx.session.scene.previous = sceneName;
});

module.exports = start;