const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const pathToMapRegions = path.join(__basedir, 'data', 'mapRegions');
const mapRegions = require(pathToMapRegions);

const keyboards = require(path.join(__dirname, 'keyboards'));

const game = new Scene('gameZone');

game.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);

    function getZoneData() {
        for (let mapRegion in mapRegions) {
            if (character.zone in mapRegions[mapRegion]) {
                return require(path.join(pathToMapRegions, mapRegion, mapRegions[mapRegion][character.zone]));
            }
        }
    }

    const zoneData = getZoneData();
    ctx.reply('Добро пожаловать в город', keyboards.getKeyboard(zoneData.actions));

    for (let action in zoneData.actions) {
        game.action(new RegExp(action), zoneData.actions[action].handler);
    }
});

module.exports = game;
