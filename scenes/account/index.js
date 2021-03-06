const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('account')
    .enter(async (ctx) => {
        const msgs = [];

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
            msgs.push(await ctx.reply(`У тебя есть персонаж, ${ account.username }, хочешь продолжить или начать новое приключение?`, keyboards.getKeyboard(account.haveCharacter)));
        } else {
            msgs.push(await ctx.reply(`Добро пожаловать ${ account.firsName } ты зарегистрирован под ником ${ account.username }, начни своё приключение!`, keyboards.getKeyboard(account.haveCharacter)));
        }

        ctx.session.messages.push(...msgs);
    })
    .action(/characterCreate|characterPlay|characterRemove/, ctx => ctx.scene.enter(ctx.callbackQuery.data))
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });