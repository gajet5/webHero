const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const commands = require(path.join(__dirname, 'commands'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const accountMessage = require(path.join(__basedir, 'data', 'dialogues', 'account'));

const account = new Scene('account');

account.enter(async (ctx) => {
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

account.action(/characterCreate/, commands.swichScene);
account.action(/characterPlay/, commands.swichScene);
account.action(/characterDelete/, commands.swichScene);

module.exports = account;