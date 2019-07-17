const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const game = new Scene('gameZones');

game.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);

});

module.exports = game;
