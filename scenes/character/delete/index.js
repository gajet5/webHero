const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const characterDelete = new Scene('characterDelete');

characterDelete.enter(async (ctx) => {
    await accountsModel.findByIdAndUpdate(ctx.session.account.id, { haveCharacter: false });
    await charactersModel.deleteMany({ accountId: ctx.session.account.id });

    ctx.reply('Ваш персонаж был удалён.');
    await ctx.scene.enter('account');
});

module.exports = characterDelete;
