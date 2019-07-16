const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

const sceneName = 'characterPlay';
const characterPlay = new Scene(sceneName);

characterPlay.enter(async (ctx) => {
    ctx.session.scene.current = sceneName;
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    ctx.session.character.id = character.id;

    await sceneUtils.swith(ctx, 'game');
});

characterPlay.leave(ctx => {
    ctx.session.scene.current = '';
    ctx.session.scene.previous = sceneName;
});

module.exports = characterPlay;
