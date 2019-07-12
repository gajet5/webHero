const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

const characterPlay = new Scene('characterPlay');

characterPlay.enter(async (ctx) => {
    ctx.session.scene.currentScene = 'characterPlay';
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    ctx.session.character.id = character.id;

    await sceneUtils.swith(ctx, 'game');
});

characterPlay.leave(ctx => {
    ctx.session.currentScene = '';
    ctx.session.previousScene = 'characterPlay';
});

module.exports = characterPlay;