const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const characterDelete = new Scene('characterDelete');

characterDelete.enter(async (ctx) => {
    await accountsModel.findByIdAndUpdate(ctx.session.account.id, { haveCharacter: false });
    await charactersModel.deleteMany({ accountId: ctx.session.account.id });

    ctx.session.messages.push(await ctx.reply('Ваш персонаж был удалён.'));
    await ctx.scene.enter('account');
});

characterDelete.leave((ctx) => {
    ctx.session.scenes.previous = ctx.session.__scenes.current;
    sceneCleaner(ctx);
});

module.exports = characterDelete;
