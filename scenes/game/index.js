const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const sceneName = 'game';
const game = new Scene(sceneName);

game.enter(async (ctx) => {
    ctx.session.scene.current = sceneName;

    const character = await charactersModel.findById(ctx.session.character.id);
    ctx.scene.enter(character.zone);
});

game.leave(ctx => {
    ctx.session.scene.current = '';
    ctx.session.scene.previous = sceneName;
});

module.exports = game;
