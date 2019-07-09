const path = require('path');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const welcomeMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'welcomeMessage'));

const start = new Scene('start');

start.enter(async (ctx) => {
    if (ctx.from) {
        const user = await accountsModel.findOne({
            userId: ctx.from.id
        });

        if (user) {
            await ctx.reply(welcomeMessage.alreadyRegistered(user.username));
            await ctx.reply('ты шо!');
            return;
        }

        const newUser = await accountsModel.create({
            userId: ctx.from.id,
            chatId: ctx.chat.id,
            firsName: ctx.from.first_name,
            username: ctx.from.username
        });

        if (user) {
            await ctx.reply(welcomeMessage.newUser(newUser.firsName, newUser.username));
        }

        await ctx.reply('ты шо!');
    }
});

start.leave(async (ctx) => {
    await ctx.reply('Сцена старта покинута!');
});

start.command('exit', async (ctx) => ctx.scene.leave());

module.exports = start;