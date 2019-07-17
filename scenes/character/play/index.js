const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

const characterPlay = new Scene('characterPlay');

characterPlay.enter(async (ctx) => {
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    ctx.session.character.id = character.id;

    await sceneUtils.swith(ctx, 'game');
});

module.exports = characterPlay;
