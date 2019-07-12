const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

const characterDelete = new Scene('characterDelete');

characterDelete.enter(async (ctx) => {
    ctx.session.scene.currentScene = 'characterDelete';
    await accountsModel.findByIdAndUpdate(ctx.session.account.id, { haveCharacter: false });
    await charactersModel.findOneAndDelete({ accountId: ctx.session.account.id });

    ctx.reply('Ваш персонаж был удалён.');
    sceneUtils.swith(ctx, 'account');
});

characterDelete.leave(ctx => {
    ctx.session.scene.currentScene = '';
    ctx.session.scene.previousScene = 'characterDelete';
});

module.exports = characterDelete;
