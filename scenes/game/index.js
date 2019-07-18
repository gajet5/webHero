const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const game = new Scene('game');

game.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);
    if (!character.zone) {
        ctx.scene.enter('gameEventsStart');
    } else {
        ctx.scene.enter('gameZone');
    }

});

module.exports = game;
